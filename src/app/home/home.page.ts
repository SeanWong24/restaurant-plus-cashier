import { Component } from '@angular/core';
import { Table } from '../models/table';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedTable: Table;

  constructor() { }

}
