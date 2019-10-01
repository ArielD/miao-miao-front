import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {
  public searchText: string;
  public users: UserModel[];
  public updatedUser: UserModel;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private alertCtrl: AlertController,
    public navCtrl: NavController
  ) {

    this.usersService.getUpdatedUser().subscribe((x) => {
      this.updatedUser = x;
    })

    this.usersService.getAll().subscribe((x) => {
      this.users = x;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]._id == this.updatedUser._id) {
          this.users[i] = this.updatedUser;
        }
      }
    })
  }

  ngOnInit() {
  }

  public editUser(id: string) {
    this.navCtrl.navigateRoot(['admin/users-management/edit-user', id]);
  }

  public deleteUser(id: string) {
    this.alertCtrl.create({
      header: 'Are you sure?', message: 'Do you really want to delete the user?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
          this.usersService.deleteUser(id).subscribe();
        }
      }]
    })
      .then(AlertEl => {
        AlertEl.present();
      });
  }
}
