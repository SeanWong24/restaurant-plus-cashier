import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Table } from 'src/app/models/table';
import { BillItem } from 'src/app/models/bill-item';
import { MenuItem } from 'src/app/models/menu-item';
import { MenuCategory } from 'src/app/models/menu-category';
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

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.selectedTable = this.navParams.get('selectedTable');
    this.selectedBillItemIds = this.navParams.get('selectedBillItemIds');
    this.refreshBillItemsHandler = this.navParams.get('refreshBillItemsHandler');
  }

  ionViewDidEnter() {
    this.fetchBillItem();
  }
  
  async fetchBillItem(){
    for (let billItemId of this.selectedBillItemIds) {
      const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/bill/item?id=' + billItemId + '&hasPaid=False');
      const billItem = await response.json() as BillItem;
      const menuItemfromBillItem = await this.fetchMenuItem(billItem.menuItemId);
      this.mappedBillItems.push({
        name: menuItemfromBillItem.name,
        category: menuItemfromBillItem.categoryId,
        unitPrice: menuItemfromBillItem.unitPrice,
        quantity: billItem.quantity,
        gst: menuItemfromBillItem.gstRate,
        pst: menuItemfromBillItem.pstRate,
        lct: menuItemfromBillItem.lctRate
      });
    }
    this.selectedBillItemPrice = await this.calculateSelectedBillItemPrice();
    this.shouldPay = this.selectedBillItemPrice;
  }

  async fetchMenuItem(menuItemId: string){
    const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/menu/item?id=' + menuItemId);
    const menuItem = await response.json() as MenuItem;
    return menuItem;
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
    return calculatedPrice
  }
  
  private async fetchBill(tableId: string) {
    const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/bill?tableId=' + tableId + '&status=Open');
    const bill = await response.json() as Bill[];
    return bill[0];
  }
  
  async confirmPayment() {
    if (this.selectedTable) {
      const bill = await this.fetchBill(this.selectedTable.name);
      if (bill) {
        await fetch(
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
          this.dismiss();
      }
    }
  }

  dismiss() {
    this.modalController.dismiss(null, null, 'payment-modal');
  }

}
