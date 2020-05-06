import { Component, OnInit } from '@angular/core';
import { MenuCategory } from 'src/app/models/menu-category';
import { MenuItem } from 'src/app/models/menu-item';
import { Table } from 'src/app/models/table';
import { ModalController, NavParams } from '@ionic/angular';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-menu-item-picker',
  templateUrl: './menu-item-picker.component.html',
  styleUrls: ['./menu-item-picker.component.scss'],
})
export class MenuItemPickerComponent implements OnInit {

  categoryList: MenuCategory[] = [];
  menuItemList: MenuItem[] = [];
  displayedMenuItemList: MenuItem[] = [];

  selectedMenuItemList: {
    name: string;
    id: string;
    quantity: number;
  }[] = [];

  selectedTable: Table;
  refreshBillItemsHandler: () => void;

  private _selectedCategory: MenuCategory;
  get selectedCategory() {
    return this._selectedCategory;
  }
  set selectedCategory(value) {
    this._selectedCategory = value;
    this.displayedMenuItemList = this.menuItemList.filter(item => item.categoryId === value.id);
  }

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.selectedTable = this.navParams.get('selectedTable');
    this.refreshBillItemsHandler = this.navParams.get('refreshBillItemsHandler');
  }

  ionViewDidEnter() {
    this.fetchMenuItemList();
    this.fetchMenuCategoryList();
  }

  addMenuItem(menuItem: MenuItem) {
    const exsitedItem = this.selectedMenuItemList.find(target => target.id === menuItem.id);
    if (exsitedItem) {
      exsitedItem.quantity++;
    } else {
      this.selectedMenuItemList.push({
        name: menuItem.name,
        id: menuItem.id,
        quantity: 1
      });
    }
  }

  removeMenuItem(menuItem) {
    const target = this.selectedMenuItemList.find(target => target === menuItem);
    if (target.quantity > 1) {
      target.quantity--;
    } else {
      this.selectedMenuItemList.splice(
        this.selectedMenuItemList.findIndex(target => target === menuItem),
        1
      );
    }
  }

  async confirm() {
    if (this.selectedTable) {
      const bill = await this.fetchBill(this.selectedTable.id);
      if (bill) {
        this.selectedMenuItemList.forEach(async item => {
          const response = await fetch(
            localStorage.getItem('serverApiBaseUrl') +
            '/bill/item/add' +
            '?billId=' + bill.id +
            '&menuItemId=' + item.id +
            '&quantity=' + item.quantity +
            '&groupId=' + 1,
            {
              method: 'POST',
              credentials: 'include'
            });
        });
        this.dismiss();
      }
      this.refreshBillItemsHandler();
    }
  }

  dismiss() {
    this.modalController.dismiss(null, null, 'menu-item-picker-modal');
  }

  private async fetchMenuItemList() {
    const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/menu/item?status=' + MenuItem.Status.Available);
    this.menuItemList = await response.json() as MenuItem[];
  }

  async fetchMenuCategoryList() {
    const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/menu/category');
    this.categoryList = await response.json() as MenuCategory[];
    if (this.categoryList && this.categoryList.length > 0) {
      this.selectedCategory = this.categoryList[0];
    }
  }

  private async fetchBill(tableId: string) {
    const response = await fetch(
      localStorage.getItem('serverApiBaseUrl') + '/bill' +
      '?tableId=' + tableId +
      '&status=' + Bill.Status.Open,
      {
        method: 'GET',
        credentials: 'include'
      });
    const bill = await response.json() as Bill[];
    return bill[0];
  }

}
