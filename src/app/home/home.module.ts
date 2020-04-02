import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TableStatusColorPipe } from './home.pipe';
import { HomePage } from './home.page';
import { TableListComponent } from './table-list/table-list.component';

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
    HomePage,
    TableListComponent
  ]
})
export class HomePageModule { }
