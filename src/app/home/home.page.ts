import { Component } from '@angular/core';
import { Table } from '../models/table';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedTable: Table;

  constructor(private navControlor: NavController) { }

  goToSettingsPage() {
    this.navControlor.navigateForward('/settings');
  }

}
