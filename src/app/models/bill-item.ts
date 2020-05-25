import { MenuItem } from './menu-item';
import { Discount } from './discount';

export class BillItem {
    id: string;
    billId: string;
    menuItemId: string;
    quantity: number;
    groupId: number = 1;
    paymentId: string = "";
    discountIdList: string[] = [];
}

export class DisplayedBillItem {
    isSelected = false;

    get itemName() {
        return this.menuItem.name;
    }

    get unitPrice() {
        return this.menuItem.unitPrice;
    }

    get quantity() {
        return this.billItem.quantity;
    }

    get totalPrice() {
        return (this.menuItem.unitPrice * this.billItem.quantity).toFixed(2);
    }

    get discount() {
        return this.discountList;
    }

    constructor(public billItem: BillItem, public menuItem: MenuItem, public discountList: Discount[]) { }
}