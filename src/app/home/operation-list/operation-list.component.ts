import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { MenuItemPickerComponent } from './menu-item-picker/menu-item-picker.component';
import { Table } from 'src/app/models/table';
import { DisplayedBillItem } from 'src/app/models/bill-item';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-operation-buttons',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss'],
})
export class OperationListComponent implements OnInit {

  @Input() selectedTable: Table;
  @Input() displayedBillItemList: DisplayedBillItem[];
  @Input() refreshBillItemsHandler: () => void;
  @Input() tableListRefreshHandler: () => void;

  get isSelectedTableUsing() {
    return this.selectedTable && this.selectedTable.status === Table.Status.Using;
  }

  get isSelectedDisplayedBillItemListEmpty() {
    const selectedDisplayedBillItemList = this.displayedBillItemList.filter(displayedBillItem => displayedBillItem.isSelected);
    return !selectedDisplayedBillItemList || selectedDisplayedBillItemList.length <= 0;
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
          handler: () => {
            selectedItemList.forEach(async displayItem => {
              const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/bill/item?id=' + displayItem.billItem.id, { method: 'DELETE' });
            });
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
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
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
                  headers: { 'Content-Type': 'application/json' },
                  method: 'PUT',
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
        refreshBillItemsHandler: this.refreshBillItemsHandler,
        tableListRefreshHandler: this.tableListRefreshHandler
      }
    });
    await modal.present();
  }

}
