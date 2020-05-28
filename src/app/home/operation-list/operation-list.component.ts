import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { MenuItemPickerComponent } from './menu-item-picker/menu-item-picker.component';
import { Table } from 'src/app/models/table';
import { DisplayedBillItem } from 'src/app/models/bill-item';
import { PaymentComponent } from './payment/payment.component';
import { Discount } from 'src/app/models/discount';
import { async } from '@angular/core/testing';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-operation-buttons',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss'],
})
export class OperationListComponent implements OnInit {

  @Input() currentBill: Bill;
  @Input() selectedTable: Table;
  @Input() displayedBillItemList: DisplayedBillItem[];
  @Input() refreshBillItemsHandler: () => void;
  @Input() tableListRefreshHandler: () => void;

  get isSelectedTableUsing() {
    return this.selectedTable && (this.selectedTable.status === Table.Status.Using || this.selectedTable.status === Table.Status.Togo);
  }

  get isDisplayedBillItemListEmpty() {
    return !this.displayedBillItemList || this.displayedBillItemList.length <= 0;
  }

  get isSelectedDisplayedBillItemListEmpty() {
    const selectedDisplayedBillItemList = this.displayedBillItemList.filter(displayedBillItem => displayedBillItem.isSelected);
    return !selectedDisplayedBillItemList || selectedDisplayedBillItemList.length <= 0;
  }

  get isDiscountListEmpty() {
    const selectedDisplayedBillItemList = this.displayedBillItemList.filter(displayedBillItem => displayedBillItem.isSelected);
    if (selectedDisplayedBillItemList.length > 0) {
      if (selectedDisplayedBillItemList.length == 1) {
        return selectedDisplayedBillItemList[0].billItem.discountIdList.length <= 0;
      }
    } else {
      if (this.currentBill && this.currentBill.discountIdDict && '1' in this.currentBill.discountIdDict) {
        return this.currentBill.discountIdDict['1'].length <= 0
      }
    }
    return true;
  }

  constructor(private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() { }

  selectAll() {
    this.displayedBillItemList.forEach(item => item.isSelected = true);
  }

  clearAll() {
    this.displayedBillItemList.forEach(item => item.isSelected = false);
  }

  async addItem() {
    const modal = await this.modalController.create({
      component: MenuItemPickerComponent,
      cssClass: 'large-modal',
      id: 'menu-item-picker-modal',
      componentProps: {
        selectedTable: this.selectedTable,
        refreshBillItemsHandler: this.refreshBillItemsHandler
      }
    });
    await modal.present();
  }

  async deleteItems() {
    const selectedItemList = this.displayedBillItemList.filter(item => item.isSelected);
    const alert = await this.alertController.create({
      header: 'Delete Items',
      message: 'Are you sure to delete ' + selectedItemList.length + ' selected item(s)?',
      buttons: [
        'Cancel',
        {
          text: 'Confirm',
          handler: async () => {
            const selectedItemIdList = [];
            selectedItemList.forEach(displayItem => {
              selectedItemIdList.push(displayItem.billItem.id);
            });
            const response = await fetch(
              localStorage.getItem('serverApiBaseUrl') + '/bill/item',
              {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedItemIdList)
              })
            this.refreshBillItemsHandler();
          }
        }
      ]
    });

    await alert.present();
  }

  async combine() {
    const billItemIdList = this.displayedBillItemList
      .filter(item => item.isSelected)
      .map(item => item.billItem.id);
    const response = await fetch(
      localStorage.getItem('serverApiBaseUrl') + '/bill/item/combine',
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(billItemIdList)
      }
    );
    this.refreshBillItemsHandler();
  }

  async split() {
    const billItemIdList = this.displayedBillItemList
      .filter(item => item.isSelected)
      .map(item => item.billItem.id);
    const alert = await this.alertController.create({
      header: 'Split items into',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Enter a number to split.'
        }
      ],
      buttons: [
        'Cancel',
        {
          text: 'Confirm',
          handler: async (alertData) => {
            const quantity = alertData.quantity;
            if (quantity) {
              const response = await fetch(
                localStorage.getItem('serverApiBaseUrl') + '/bill/item/split?quantity=' + quantity,
                {
                  method: 'PUT',
                  credentials: 'include',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(billItemIdList)
                }
              );
              this.refreshBillItemsHandler();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async applyDiscount() {
    const availableDiscountList = await this.fetchDicountList();
    if (availableDiscountList) {
      if (this.isSelectedDisplayedBillItemListEmpty) {
        //add discount to bill
        const discountButtons = this.turnListToRadioButton(availableDiscountList);
        const targetBillId = this.currentBill.id;
        const alert = await this.alertController.create({
          header: 'Add discount to: ' + this.selectedTable.name,
          inputs: discountButtons,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary'
            }, {
              text: 'Confirm',
              handler: async (data: string) => {
                if (targetBillId) {
                  const response1 = await fetch(localStorage.getItem('serverApiBaseUrl') +
                    '/bill/discount' +
                    '?id=' + targetBillId +
                    '&discountId=' + data +
                    '&groupId=1',
                    {
                      method: 'PUT',
                      credentials: 'include'
                    });

                  if (response1) {
                    this.refreshBillItemsHandler();
                    this.messageAlert('Discount successfully applied.');
                  }
                }
              }
            }
          ]
        });
        await alert.present();
      } else {
        // add discount to billItem
        const discountButtons = this.turnListToRadioButton(availableDiscountList);
        const selectedDisplayedBillItemList = this.displayedBillItemList.filter(displayedBillItem => displayedBillItem.isSelected).map(item => item.billItem.id);
        const alert = await this.alertController.create({
          header: 'Add discount to ' + selectedDisplayedBillItemList.length + (selectedDisplayedBillItemList.length === 1 ? 'item.' : ' items.'),
          inputs: discountButtons,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary'
            }, {
              text: 'Confirm',
              handler: async (data: string) => {
                const response2 = await fetch(localStorage.getItem('serverApiBaseUrl') +
                  '/bill/item/discount' +
                  '?discountId=' + data,
                  {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(selectedDisplayedBillItemList),
                    credentials: 'include'
                  });

                if (response2) {
                  this.refreshBillItemsHandler();
                  this.messageAlert('Discount successfully applied.');
                }
              }
            }
          ]
        });
        await alert.present();
      }
    } else {
      this.messageAlert('No discounts available now. Please contact the manager.');
    }
  }

  async removeDiscount(groupId: string = '1') {
    if (this.isSelectedDisplayedBillItemListEmpty) {
      //remove discount from selected bill
      const targetBill = this.currentBill;
      if (targetBill) {
        const disconutListOfBill = await this.fetchDicountList(targetBill.discountIdDict[groupId]);
        const discountButtons = this.turnListToRadioButton(disconutListOfBill);
        const alert = await this.alertController.create({
          header: 'Remove discount from: ' + this.selectedTable.name,
          inputs: discountButtons,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary'
            }, {
              text: 'Remove',
              handler: async (data: string) => {
                if (targetBill.id) {
                  const response1 = await fetch(localStorage.getItem('serverApiBaseUrl') +
                    '/bill/remove/discount' +
                    '?id=' + targetBill.id +
                    '&discountId=' + data +
                    '&groupId=' + groupId,
                    {
                      method: 'PUT',
                      credentials: 'include'
                    });

                  if (response1) {
                    this.refreshBillItemsHandler();
                    this.messageAlert('Discount successfully removed.');
                  }
                }
              }
            }
          ]
        });
        await alert.present();
      }
    } else {
      //remove discount from selected bill items
      const selectedDisplayedBillItemList = this.displayedBillItemList.filter(displayedBillItem => displayedBillItem.isSelected).map(item => item.billItem);
      if (selectedDisplayedBillItemList.length > 1) {
        this.messageAlert('You can only select one item at a time :(');
      } else {
        const discountListOfBillItem = await this.fetchDicountList(selectedDisplayedBillItemList[0].discountIdList);
        const discountButtons = this.turnListToRadioButton(discountListOfBillItem);
        const alert = await this.alertController.create({
          header: 'Remove discount from: ' + this.selectedTable.name,
          inputs: discountButtons,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary'
            }, {
              text: 'Remove',
              handler: async (data: string) => {
                if (selectedDisplayedBillItemList[0].id) {
                  const response1 = await fetch(localStorage.getItem('serverApiBaseUrl') +
                    '/bill/item/remove/discount' +
                    '?id=' + selectedDisplayedBillItemList[0].id +
                    '&discountId=' + data,
                    {
                      method: 'PUT',
                      credentials: 'include'
                    });

                  if (response1) {
                    this.refreshBillItemsHandler();
                    this.messageAlert('Discount successfully removed.');
                  }
                }
              }
            }
          ]
        });
        await alert.present();
      }
    }
  }

  async pay() {
    const billItemIdList = this.displayedBillItemList
      .filter(item => item.isSelected)
      .map(item => item.billItem.id);
    const modal = await this.modalController.create({
      component: PaymentComponent,
      cssClass: 'large-modal',
      id: 'payment-modal',
      componentProps: {
        selectedBillItemIds: billItemIdList,
        selectedTable: this.selectedTable,
        currentBill: this.currentBill,
        refreshBillItemsHandler: this.refreshBillItemsHandler,
        tableListRefreshHandler: this.tableListRefreshHandler,
        fetchDiscountHandler: this.fetchDicountList
      }
    });
    await modal.present();
  }

  private async fetchDicountList(discountIdList?: string[]) {
    var discountObjectList;
    if (discountIdList) {
      const response = await fetch(localStorage.getItem('serverApiBaseUrl') +
        '/bill/discount',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discountIdList)
        });
      discountObjectList = await response.json();
    } else {
      const response = await fetch(localStorage.getItem('serverApiBaseUrl') +
        '/bill/discount',
        {
          method: 'POST',
          credentials: 'include'
        });
      discountObjectList = await response.json();
    }
    return discountObjectList as Discount[];
  }

  private turnListToRadioButton(list: Partial<Discount>[]) {
    const discountList = [];
    for (const discount of list) {
      discountList.push(
        {
          name: discount.name,
          type: 'radio',
          label: discount.name,
          value: discount.id
        })
    }
    return discountList;
  }

  private async messageAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
