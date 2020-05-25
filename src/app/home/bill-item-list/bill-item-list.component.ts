import { Component, OnInit, Input } from '@angular/core';
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
      const bill = await this.fetchBill(this.selectedTable.id);
      if (bill) {
        const menuItemList = await this.fetchMenuItemList();
        const billItemList = await this.fetchBillItemList(bill.id, "False");
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
    const result = [];
    for (const id of discountIdList) {
      const resopnse = await fetch(localStorage.getItem('serverApiBaseUrl') + '/bill/discount' +
        '?id=' + id,
        {
          method: 'GET',
          credentials: 'include'
        });

      const discount = (await resopnse.json() as Discount[])[0];
      result.push(discount);
    }
    return result;
  }

  private async generateDisplayList(billItemList: BillItem[], menuItemList: MenuItem[]) {
    const list: DisplayedBillItem[] = [];

    for (const billItem of billItemList) {
      const menuItem = menuItemList.find(item => item.id === billItem.menuItemId);
      const discountList = await this.fetchDiscountList(billItem.discountIdList);

      list.push(new DisplayedBillItem(billItem, menuItem, discountList));
    }
    return list;
  }

}
