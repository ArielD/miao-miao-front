import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.page.html',
  styleUrls: ['./users-management.page.scss'],
})
export class UsersManagementPage implements OnInit {
  public isAddBtnVisible: boolean = true;

  constructor(
    private menu: MenuController,
    private router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/admin' || event.url == '/admin/users-management' || event.url == '/admin/users-management/list-users') {
          this.isAddBtnVisible = true;
        } else {
          this.isAddBtnVisible = false;
        }       
      }
    });
   }

  ngOnInit() {
  }

  public openMenu() {
    this.menu.open('start');
  }

  public navigateToAddUser() {
    this.router.navigate(['admin/add-user'])
  }
}
