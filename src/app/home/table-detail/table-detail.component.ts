import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss'],
})
export class TableDetailComponent implements OnInit {

  private tableTimer: any;

  @Input() selectedTable: Table;
  @Input() tableListRefreshHandler: () => void;

  tableDuration: string;

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.startTableTimer();
  }

  operate(operationIndex: string | number, occupied: string | number) {
    switch (+operationIndex) {
      case 0:
        this.operate0(+occupied);
        break;
      case 1:
        this.operate1(+occupied);
        break;
      case 2:
        this.operate2(+occupied);
        break;
    }
  }

  private startTableTimer() {
    if (this.tableTimer) {
      clearInterval(this.tableTimer);
    }
    this.tableTimer = setInterval(() => {
      if (this.selectedTable && this.selectedTable.startTime) {
        const startTime = new Date(this.selectedTable.startTime);
        const currentTime = new Date();
        const diff = currentTime.getTime() - startTime.getTime();
        const dateDiff = new Date(diff);

        const days = Math.floor(diff / 1000 / 60 / (60 * 24));
        this.tableDuration =
          days + 'd' +
          ('0' + dateDiff.getUTCHours()).slice(-2) + ':' +
          ('0' + dateDiff.getUTCMinutes()).slice(-2) + ':' +
          ('0' + dateDiff.getUTCSeconds()).slice(-2);
      } else {
        this.tableDuration = '';
      }
    }, 1000);
  }

  private async operate0(occupied: number) {
    switch (this.selectedTable.status) {
      case 'Free':
      case 'Dirty':
        await this.disable();
        break;
      case 'Using':
      case 'Reserved':
        await this.modify(occupied);
        break;
    }
    this.tableListRefreshHandler();
  }

  private async operate1(occupied: number) {
    switch (this.selectedTable.status) {
      case 'Free':
        await this.reserve(occupied);
        break;
      case 'Using':
        await this.transfer();
        break;
      case 'Reserved':
      case 'Dirty':
      case 'Unavailable':
        await this.free();
        break;
    }
    this.tableListRefreshHandler();
  }

  private async operate2(occupied: number) {
    switch (this.selectedTable.status) {
      case 'Free':
      case 'Reserved':
        await this.open(occupied);
        break;
      case 'Using':
        await this.close();
        break;
    }
    this.tableListRefreshHandler();
  }


  private async open(occupied: number) {
    const response = await fetch(
      localStorage.getItem('serverApiBaseUrl') +
      '/table/open' +
      '?id=' + this.selectedTable.id +
      '&occupied=' + (+occupied ? occupied : 1),
      {
        method: 'PUT',
        credentials: 'include'
      });
  }

  private async reserve(occupied: number) {
    const response = await fetch(
      localStorage.getItem('serverApiBaseUrl') +
      '/table/reserve' +
      '?id=' + this.selectedTable.id +
      '&occupied=' + occupied,
      {
        method: 'PUT',
        credentials: 'include'
      });
  }

  private async disable() {
    const response = await fetch(
      localStorage.getItem('serverApiBaseUrl') +
      '/table/disable' +
      '?id=' + this.selectedTable.id,
      {
        method: 'PUT',
        credentials: 'include'
      });
  }

  private async free() {
    const response = await fetch(
      localStorage.getItem('serverApiBaseUrl') +
      '/table/free?id=' + this.selectedTable.id,
      {
        method: 'PUT',
        credentials: 'include'
      });
  }

  private async transfer() {
    const response = await fetch(
      localStorage.getItem('serverApiBaseUrl') + '/table?status=Free',
      {
        method: 'GET',
        credentials: 'include'
      }
    );
    const availableTableList = await response.json() as Table[];
    if (availableTableList) {
      const tableInputs = [];
      for (const table of availableTableList) {
        tableInputs.push(
          {
            name: table.name,
            type: 'radio',
            label: table.name,
            value: table.id
          })
      }
      const alert = await this.alertController.create({
        header: 'Transfer to:',
        inputs: tableInputs,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary'
          }, {
            text: 'Confirm',
            handler: async (data: string) => {
              const response1 = await fetch(localStorage.getItem('serverApiBaseUrl') +
                '/table/transfer' +
                '?id=' + this.selectedTable.id +
                '&transferId=' + data,
                {
                  method: 'PUT',
                  credentials: 'include'
                });

              this.tableListRefreshHandler();
            }
          }
        ]
      });

      await alert.present();
    }
  }

  private async modify(occupied: number) {
    const response = await fetch(
      localStorage.getItem('serverApiBaseUrl') +
      '/table/modify-occupied' +
      '?id=' + this.selectedTable.id +
      '&occupied=' + occupied,
      {
        method: 'PUT',
        credentials: 'include'
      });
  }

  private async close() {
    const alert = await this.alertController.create({
      header: 'Close ' + this.selectedTable.name,
      message: 'Are you sure to close ' + this.selectedTable.name + '?',
      buttons: [
        'Cancel',
        {
          text: 'Confirm',
          handler: async () => {
            const response = await fetch(
              localStorage.getItem('serverApiBaseUrl') +
              '/table/close?id=' + this.selectedTable.id,
              {
                method: 'PUT',
                credentials: 'include'
              });
            // TODO doing this twice, try to find a solution to call it just once
            this.tableListRefreshHandler();
          }
        }
      ]
    });

    await alert.present();
  }

}
