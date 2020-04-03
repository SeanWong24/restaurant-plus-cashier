import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TableStatusColorPipe, TableOperationButtonTextPipe } from './home.pipe';
import { HomePage } from './home.page';
import { TableListComponent } from './table-list/table-list.component';
import { TableDetailComponent } from './table-detail/table-detail.component';

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
    TableDetailComponent
  ]
})
export class HomePageModule { }
