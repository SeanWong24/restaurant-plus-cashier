import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { MenuItemPickerComponent } from './menu-item-picker/menu-item-picker.component';
import { Table } from 'src/app/models/table';
import { DisplayedBillItem } from 'src/app/models/bill-item';

@Component({
  selector: 'app-operation-buttons',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss'],
})
export class OperationListComponent implements OnInit {

  @Input() selectedTable: Table;
  @Input() displayedBillItemList: DisplayedBillItem[];
  @Input() refreshBillItemsHandler: () => void;

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

}
