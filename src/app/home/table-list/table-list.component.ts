import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Table } from 'src/app/models/table';
import { AlertController } from '@ionic/angular';

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

  constructor(private alertController: AlertController) { }

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

  async addTogo() {
    const alert = await this.alertController.create({
      header: 'Transfer to:',
      inputs: [
        {
          type: 'radio',
          label: 'Pick-up',
          value: 'p'
        },
        {
          type: 'radio',
          label: 'Delivery',
          value: 'd'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: async (data: string) => {
            const response1 = await fetch(localStorage.getItem('serverApiBaseUrl') +
              '/bill/add/togo' +
              '?togoType=' + data,
              {
                method: 'POST',
                credentials: 'include'
              });

            this.fetchTableList();
          }
        }
      ]
    });

    await alert.present();
  }

  fetchTableList = async () => {
    const response1 = await fetch(
      localStorage.getItem('serverApiBaseUrl') + '/table',
      {
        method: 'GET',
        credentials: 'include'
      }
    );
    const response2 = await fetch(
      localStorage.getItem('serverApiBaseUrl') + '/bill/togo',
      {
        method: 'GET',
        credentials: 'include'
      }
    );
    this.tableList = (await response1.json() as Table[]).concat(await response2.json() as Table[]);

    if (this.selectedTable) {
      this.selectedTable = this.tableList.find(table => table.name == this.selectedTable.name);
    }
  }

}
