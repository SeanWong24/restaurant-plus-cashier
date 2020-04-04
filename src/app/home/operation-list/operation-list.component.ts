import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(private modalController: ModalController) { }

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

}
