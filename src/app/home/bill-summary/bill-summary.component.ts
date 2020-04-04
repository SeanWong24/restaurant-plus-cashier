import { Component, OnInit } from '@angular/core';
import { DisplayedBillItem } from 'src/app/models/bill-item';

@Component({
  selector: 'app-bill-summary',
  templateUrl: './bill-summary.component.html',
  styleUrls: ['./bill-summary.component.scss'],
})
export class BillSummaryComponent implements OnInit {

  billItemCount = 0;
  billPriceBeforeTaxes = 0;
  billGst = 0;
  billPst = 0;
  billLct = 0;
  billPriceAfterTaxes = 0;

  constructor() { }

  ngOnInit() { }

  refresh = async (displayItemList: DisplayedBillItem[]) => {
    this.billItemCount = displayItemList.filter(item => item.isSelected).length;
    this.billPriceBeforeTaxes = this.calculateBillPriceBeforeTaxes(displayItemList);
    this.billGst = this.calculateBillTax(displayItemList, 'gst');
    this.billPst = this.calculateBillTax(displayItemList, 'pst');
    this.billLct = this.calculateBillTax(displayItemList, 'lct');
    this.billPriceAfterTaxes = this.billPriceBeforeTaxes + this.billGst + this.billPst + this.billLct;
  }

  private calculateBillPriceBeforeTaxes(displayedBillItemList: DisplayedBillItem[]) {
    let billTotalPriceBeforeTaxes = 0;
    displayedBillItemList.forEach(displayedBillItem => {
      billTotalPriceBeforeTaxes += displayedBillItem.unitPrice * displayedBillItem.quantity;
    });
    return billTotalPriceBeforeTaxes;
  }

  private calculateBillTax(displayItemList: DisplayedBillItem[], taxName: string) {
    let billTax = 0;
    displayItemList.forEach(displayedBillItem => {
      billTax += displayedBillItem.unitPrice * displayedBillItem.menuItem[taxName + 'Rate'] * displayedBillItem.quantity;
    });
    return billTax;
  }

}
