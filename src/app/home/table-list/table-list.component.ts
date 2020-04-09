import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Table } from 'src/app/models/table';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {

  tableList: Table[];

  private _selectedTable: Table;
  get selectedTable() {
    return this._selectedTable;
  }
  @Input() set selectedTable(value: Table) {
    this._selectedTable = value;
    this.selectedTableChange.emit(value);
  }
  @Output() selectedTableChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.fetchTableList();
  }

  ionViewDidEnter() {
    debugger
    this.fetchTableList();
  }

  selectTable(table: Table) {
    this.selectedTable = table;
  }

  fetchTableList = async () => {
    const response = await fetch(localStorage.getItem('serverApiBaseUrl') + '/table');
    this.tableList = await response.json();

    if (this.selectedTable) {
      this.selectedTable = this.tableList.find(table => table.name == this.selectedTable.name);
    }
  }

}