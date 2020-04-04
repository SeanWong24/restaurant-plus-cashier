import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Table } from 'src/app/models/table';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  selectedTable: Table;
  selectedBillItemIds: [];
  refreshBillItemsHandler: () => void;

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.selectedTable = this.navParams.get('selectedTable');
    this.selectedBillItemIds = this.navParams.get('selectedBillItemIds');
    this.refreshBillItemsHandler = this.navParams.get('refreshBillItemsHandler');
  }

  dismiss() {
    this.modalController.dismiss(null, null, 'payment-modal');
  }

}
