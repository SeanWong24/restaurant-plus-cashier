import { Component } from '@angular/core';
import { Table } from '../models/table';
import { NavController } from '@ionic/angular';
import { User } from '../models/user';
import { Role } from '../models/role';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedTable: Table;
  private _accessCode: string = '';
  get accessCode() {
    return this._accessCode;
  }
  set accessCode(value: string) {
    this._accessCode = value;
    if (value.length >= 6) {
      this.login(value);
      this.accessCode = '';
    }
  }

  get user() {
    const userJson = sessionStorage.getItem('user');
    return userJson ? JSON.parse(userJson) as User : undefined;
  }
  set user(value: User) {
    if (value) {
      sessionStorage.setItem('user', JSON.stringify(value));
    } else {
      sessionStorage.removeItem('user');
    }
  }

  get role() {
    const roleJson = sessionStorage.getItem('role');
    return roleJson ? JSON.parse(roleJson) as Role : undefined;
  }
  set role(value: Role) {
    if (value) {
      sessionStorage.setItem('role', JSON.stringify(value));
    } else {
      sessionStorage.removeItem('role');
    }
  }

  constructor(private navControlor: NavController) { }

  ionViewDidEnter() {
    this.fetchUserAndRole();
  }

  accessCodeButtonClickHandler(value: string) {
    switch (value) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.accessCode += value;
        break;
      case 'clear':
        this.accessCode = '';
        break;
      case 'delete':
        this.accessCode = this.accessCode.slice(0, -1);
        break;
    }
  }
  goToSettingsPage() {
    this.navControlor.navigateForward('/settings');
  }

  async login(accessCode: string | number) {
    const response = await fetch(
      localStorage.getItem('serverApiBaseUrl') + '/user/login',
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'accessCode',
          message: accessCode.toString()
        })
      }
    );
    await this.fetchUserAndRole();
  }

  async logout() {
    const response = await fetch(
      localStorage.getItem('serverApiBaseUrl') + '/user/logout',
      {
        method: 'POST',
        credentials: 'include',
      }
    );
    await this.fetchUserAndRole();
  }

  private async fetchUserAndRole() {
    await this.fetchUser();
    await this.fetchRole();
  }

  private async fetchUser() {
    const response = await fetch(
      localStorage.getItem('serverApiBaseUrl') + '/user/self',
      {
        method: 'GET',
        credentials: 'include'
      }
    );
    if (response.status === 200) {
      try {
        this.user = await response.json();
        return;
      } catch { }
    }
    this.user = undefined;
  }

  private async fetchRole() {
    if (this.user) {
      const response = await fetch(
        localStorage.getItem('serverApiBaseUrl') + '/user/role/self',
        {
          method: 'GET',
          credentials: 'include'
        }
      );
      if (response.status === 200) {
        try {
          this.role = await response.json();
          return;
        } catch { }
      }
    }
    this.role = undefined;
  }

}
