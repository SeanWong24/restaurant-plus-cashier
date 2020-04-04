import { MenuItem } from './menu-item';

export class BillItem {
    id: string;
    billId: string;
    menuItemId: string;
    quantity: number;
    groupId: number = 1;
    paymentId: string = "";
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

    constructor(public billItem: BillItem, public menuItem: MenuItem) { }
}