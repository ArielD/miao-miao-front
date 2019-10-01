import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { environment } from 'src/environments/environment';
import { UserModel } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  public apiURL = environment.apiTest;
  public userId: string;
  public user: UserModel;
  public userAvatar: File;
  public previewImage;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersServices: UsersService,
    public navCtrl: NavController,
    private _location: Location
  ) { 
    this.userId = this.route.snapshot.paramMap.get('id');
    this.usersServices.getUserById(this.userId).subscribe((x)=> {
      this.user = x;
    });
  }

  ngOnInit() {
  }

  public updateUser() {
    this.usersServices.updateUser(this.user).subscribe();
    this.usersServices.setUpdatedUser(this.user);
    this.usersServices.uploadAvatar(this.userAvatar, this.userId).subscribe();
    this.navigateBack();
  }

  public uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.previewImage = reader.result;
      reader.readAsDataURL(file);
    }
    this.userAvatar = event.target.files[0];
  }

  public navigateBack() {
    this._location.back();
  }
}
