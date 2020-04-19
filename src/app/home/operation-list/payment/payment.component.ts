import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { Table } from 'src/app/models/table';
import { BillItem } from 'src/app/models/bill-item';
import { MenuItem } from 'src/app/models/menu-item';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  selectedBillItemPrice = 0;
  shouldPay = 0;
  tipReceive = 0;
  cashAlreadyPay = false;
  cardAlreadyPay = false;

  private _cashPay: number;
  get cashPay() {
    return this._cashPay;
  }
  set cashPay(value) {
    if (value > 0) {
      this.cashAlreadyPay = true;
      this._cashPay = value;
      if (this.cardAlreadyPay) {
        this.shouldPay = this.selectedBillItemPrice - this.cashPay - this.cardPay;
      } else {
        this.shouldPay = this.selectedBillItemPrice - this.cashPay;
      }
      this.changeGiven = - this.shouldPay;
    }
  }

  private _cardPay: number;
  get cardPay() {
    return this._cardPay;
  }
  set cardPay(value) {
    if (value > 0) {
      this.cardAlreadyPay = true;
      this._cardPay = value;
      if (this.cashAlreadyPay) {
        this.shouldPay = this.selectedBillItemPrice - this.cardPay - this.cashPay;
      } else {
        this.shouldPay = this.selectedBillItemPrice - this.cardPay;
      }
      this.tipReceive = - this.shouldPay;
    }
  }

  private _changeGiven: number;
  get changeGiven() {
    return this._changeGiven;
  }
  set changeGiven(value) {
    this._changeGiven = value;
    this.tipReceive = - (+ this.changeGiven + this.shouldPay);
  }

  mappedBillItems: {
    name: string;
    category: string;
    unitPrice: number;
    quantity: number;
    gst: number;
    pst: number;
    lct: number;
  }[] = [];

  selectedTable: Table;
  selectedBillItemIds: [];
  refreshBillItemsHandler: () => void;
  tableListRefreshHandler: () => void;

  constructor(private modalController: ModalController, private navParams: NavParams, private alertController: AlertController) { }

  ngOnInit() {
    this.selectedTable = this.navParams.get('selectedTable');
    this.selectedBillItemIds = this.navParams.get('selectedBillItemIds');
    this.refreshBillItemsHandler = this.navParams.get('refreshBillItemsHandler');
    this.tableListRefreshHandler = this.navParams.get('tableListRefreshHandler');
  }

  ionViewDidEnter() {
    this.fetchBillItem();
  }

  async fetchBillItem(){
    for (let billItemId of this.selectedBillItemIds) {
      const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/bill/item?id=' + billItemId + '&hasPaid=False');
      const billItem = await response.json() as BillItem;
      console.log(billItem);
      const menuItemfromBillItem = await this.fetchMenuItem(billItem[0].menuItemId);
      console.log(menuItemfromBillItem);
      this.mappedBillItems.push({
        name: menuItemfromBillItem.name,
        category: menuItemfromBillItem.categoryId,
        unitPrice: menuItemfromBillItem.unitPrice,
        quantity: billItem[0].quantity,
        gst: menuItemfromBillItem.gstRate,
        pst: menuItemfromBillItem.pstRate,
        lct: menuItemfromBillItem.lctRate
      });
    }
    console.log(this.mappedBillItems);
    this.selectedBillItemPrice = await this.calculateSelectedBillItemPrice();
    this.shouldPay = this.selectedBillItemPrice;
  }

  async fetchMenuItem(menuItemId: string){
    const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/menu/item?id=' + menuItemId);
    const menuItem = await response.json() as MenuItem;
    return menuItem[0];
  }

  private async calculateSelectedBillItemPrice() {
    let calculatedPrice = 0
    this.mappedBillItems.forEach(selectedItem =>{
      calculatedPrice += ( selectedItem.unitPrice * selectedItem.quantity +
                            selectedItem.unitPrice * selectedItem. quantity * selectedItem.gst +
                            selectedItem.unitPrice * selectedItem. quantity * selectedItem.pst +
                            selectedItem.unitPrice * selectedItem. quantity * selectedItem.lct
                          )
    });
    return calculatedPrice;
  }
  
  private async fetchBill(tableId: string) {
    const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/bill?tableId=' + tableId + '&status=Open');
    const bill = await response.json() as Bill[];
    return bill[0];
  }
  
  async confirmPayment() {
    if (this.selectedTable) {
      const bill = await this.fetchBill(this.selectedTable.id);
      if (bill) {
        const respond = await fetch(
          localStorage.getItem('serverApiBaseUrl') +
          '/payment/pay?' +
          'billId=' + bill.id +
          '&cashPayAmount=' + this.cashPay +
          '&cardPayAmount=' + this.cardPay +
          '&changeGiven=' + this.changeGiven,
          { method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.selectedBillItemIds) });
          
          this.refreshBillItemsHandler();

          const respond2 = await fetch(
            localStorage.getItem('serverApiBaseUrl') +
            '/bill/item?' +
            'billId=' + bill.id +
            '&hasPaid=' + 'false'
          );
          const unPaidItem = await respond2.json();
          if (respond && Object.keys(unPaidItem).length == 0) {
            this.closeTableAlertConfirm();
          }
          this.dismiss();
      }
    }
  }

  async closeTableAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'All items are paid.',
      message: '<strong>Close this table?<strong>',
      buttons: [
        {
          text: 'NOT YET',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'YES',
          handler: async () => {
            const respond3 = await fetch(localStorage.getItem('serverApiBaseUrl') +
            '/table/close?' +
            'id=' + this.selectedTable.id,
            { method: 'PUT' }
            );

            this.tableListRefreshHandler();
          }
        }
      ]
    });

    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss(null, null, 'payment-modal');
  }

}
