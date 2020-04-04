import { Component, OnInit, Input } from '@angular/core';
import { DisplayedBillItem, BillItem } from 'src/app/models/bill-item';
import { Table } from 'src/app/models/table';
import { MenuItem } from 'src/app/models/menu-item';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-bill-item-list',
  templateUrl: './bill-item-list.component.html',
  styleUrls: ['./bill-item-list.component.scss'],
})
export class BillItemListComponent implements OnInit {

  dispalyedBillItemList: DisplayedBillItem[] = [];

  private _selectedTable: Table;
  get selectedTable() {
    return this._selectedTable;
  }
  @Input() set selectedTable(value: Table) {
    this._selectedTable = value;
    this.selectedTableChangedHandler();
  }

  constructor() { }

  ngOnInit() { }

  refreshBillItems = async () => {
    if (this.selectedTable) {
      const bill = await this.fetchBill(this.selectedTable.name);
      if (bill) {
        const menuItemList = await this.fetchMenuItemList();
        const billItemList = await this.fetchBillItemList(bill.id, "False");
        this.dispalyedBillItemList = this.generateDisplayList(billItemList, menuItemList);
        return;
      }
    }
    this.dispalyedBillItemList = [];
  }

  private selectedTableChangedHandler() {
    this.refreshBillItems();
  }

  private async fetchMenuItemList() {
    const resopnse = await fetch(localStorage.getItem('serverApiBaseUrl') + '/menu/item');
    const menuItemList = await resopnse.json() as MenuItem[];
    return menuItemList;
  }

  private async fetchBill(tableId: string) {
    let response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/bill?tableId=' + tableId + '&status=' + Bill.Status.Open);
    const bill = await response.json() as Bill[];

    return bill[0];
  }

  private async fetchBillItemList(billId: string, hasPaid: string) {
    const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/bill/item?billId=' + billId + '&hasPaid=' + hasPaid);
    const billItemList = await response.json() as BillItem[];
    return billItemList;
  }

  private generateDisplayList(billItemList: BillItem[], menuItemList: MenuItem[]) {
    const list: DisplayedBillItem[] = [];
    for (const billItem of billItemList) {
      const menuItem = menuItemList.find(item => item.id === billItem.menuItemId);
      list.push(new DisplayedBillItem(billItem, menuItem));
    }
    return list;
  }

}
