import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../shared/models/user.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { Role } from '../../shared/enums/role.enum';
import { NavController } from '@ionic/angular';
import { navigation } from './_nav';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.page.html',
  styleUrls: ['./profile-list.page.scss'],
})
export class ProfileListPage implements OnInit {

  public apiURL = environment.apiTest;
  public currentUser: UserModel;
  public isAdmin: boolean = false;
  public navigation = navigation;
  public photo: string;

  constructor(
    private authenticationService: AuthenticationService,
    public navCtrl: NavController,
    private camera: Camera,
    private base64: Base64,
    public _DomSanitizationService: DomSanitizer
  ) {

  }

  async ionViewWillEnter() {
    this.currentUser = await this.authenticationService.getCurrentUser().toPromise();
    if (this.currentUser) {
      if (this.currentUser.role == Role.Admin) {
        this.isAdmin = true;
      }
      this.authenticationService.setCurrentUserSubject(this.currentUser)
    }
    // .subscribe((x) => {
    //   this.currentUser = x;
    //   if (this.currentUser.role == Role.Admin) {
    //     this.isAdmin = true;
    //   }
    //   this.authenticationService.setCurrentUserSubject(this.currentUser)
    // });
  }

 ngOnInit() {
    // this.currentUser = await this.authenticationService.getCurrentUser().toPromise();
    // if (this.currentUser.role == Role.Admin) {
    //   this.isAdmin = true;
    // }
    // this.authenticationService.setCurrentUserSubject(this.currentUser)

  }

  public takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64.encodeFile(imageData).then((base64File: string) => {
      console.log(base64File);
      this.photo = base64File;
    }, (err) => {
      console.log(err);
    });
    //  let base64Image = 'data:image/jpeg;base64,' + imageData;
   
    }, (err) => {
     // Handle error
    });
  }

  navigateToAdminPanel() {
    this.navCtrl.navigateRoot(['admin']);
  }


  public navigate(id: string) {
    if (id === 'order') {
      this.navCtrl.navigateRoot(['tabs/profile/orders'])
    }

    if (id === 'logout') {
      localStorage.removeItem('token');
      this.navCtrl.navigateRoot(['auth/signin']);
    }
  }

  public signUp(): void {
    this.navCtrl.navigateRoot(['auth/signup']);
  }

  public signIn(): void {
    this.navCtrl.navigateRoot(['auth/signin']);
  }
}
