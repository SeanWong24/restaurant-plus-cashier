import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DisplayedBillItem, BillItem } from 'src/app/models/bill-item';
import { Table } from 'src/app/models/table';
import { MenuItem } from 'src/app/models/menu-item';
import { Bill } from 'src/app/models/bill';
import { Discount } from 'src/app/models/discount';

@Component({
  selector: 'app-bill-item-list',
  templateUrl: './bill-item-list.component.html',
  styleUrls: ['./bill-item-list.component.scss'],
})
export class BillItemListComponent implements OnInit {

  displayedBillItemList: DisplayedBillItem[] = [];

  @Input() refreshBillSummaryHandler: (dispalyItemList: DisplayedBillItem[]) => void;

  private _currentBill: Bill;
  get currentBill() {
    return this._currentBill;
  }
  @Input() set currentBill(value: Bill) {
    this._currentBill = value;
    this.currentBillChange.emit(value);
  }
  @Output() currentBillChange = new EventEmitter();

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
      this.currentBill = await this.fetchBill(this.selectedTable.id);
      if (this.currentBill) {
        const menuItemList = await this.fetchMenuItemList();
        const billItemList = await this.fetchBillItemList(this.currentBill.id, "False");
        this.displayedBillItemList = await this.generateDisplayList(billItemList, menuItemList);

        this.refreshBillSummaryHandler(this.displayedBillItemList);
        return;
      }
    }
    this.displayedBillItemList = [];
  }

  checkBoxValueChangeHandler() {
    const selectedItemList = this.displayedBillItemList.filter(item => item.isSelected);
    if (selectedItemList.length > 0) {
      this.refreshBillSummaryHandler(selectedItemList);
    } else {
      this.refreshBillSummaryHandler(this.displayedBillItemList);
    }
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
    let response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/bill' +
      '?tableId=' + tableId +
      '&status=' + Bill.Status.Open,
      {
        method: 'GET',
        credentials: 'include'
      });
    const bill = await response.json() as Bill[];

    return bill[0];
  }

  private async fetchBillItemList(billId: string, hasPaid: string) {
    const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/bill/item' +
      '?billId=' + billId +
      '&hasPaid=' + hasPaid,
      {
        method: 'GET',
        credentials: 'include'
      });
    const billItemList = await response.json() as BillItem[];
    return billItemList;
  }

  private async fetchDiscountList(discountIdList: string[]) {
    const resopnse = await fetch(localStorage.getItem('serverApiBaseUrl') + '/bill/discount',
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discountIdList)
      });

    return await resopnse.json() as Discount[];
  }

  private async generateDisplayList(billItemList: BillItem[], menuItemList: MenuItem[]) {
    const list: DisplayedBillItem[] = [];

    for (const billItem of billItemList) {
      const menuItem = menuItemList.find(item => item.id === billItem.menuItemId);
      if (billItem.discountIdList.length > 0) {
        var discountList = await this.fetchDiscountList(billItem.discountIdList);
      } else {
        discountList = [];
      }

      list.push(new DisplayedBillItem(billItem, menuItem, discountList));
    }
    return list;
  }

}
