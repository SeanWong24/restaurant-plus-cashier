import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TableStatusColorPipe, TableOperationButtonTextPipe } from './home.pipe';
import { HomePage } from './home.page';
import { TableListComponent } from './table-list/table-list.component';
import { TableDetailComponent } from './table-detail/table-detail.component';
import { OperationListComponent } from './operation-list/operation-list.component';
import { BillItemListComponent } from './bill-item-list/bill-item-list.component';
import { MenuItemPickerComponent } from './operation-list/menu-item-picker/menu-item-picker.component';
import { BillSummaryComponent } from './bill-summary/bill-summary.component';
import { PaymentComponent } from './operation-list/payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    TableStatusColorPipe,
    TableOperationButtonTextPipe,
    HomePage,
    TableListComponent,
    TableDetailComponent,
    BillItemListComponent,
    BillSummaryComponent,
    OperationListComponent,
    MenuItemPickerComponent,
    PaymentComponent
  ],
  entryComponents: [
    MenuItemPickerComponent,
    PaymentComponent
  ]
})
export class HomePageModule { }
