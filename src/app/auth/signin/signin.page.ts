import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  public signin: FormGroup;
  public submitted: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authSocService: AuthService
  ) { }

  ngOnInit() {
    this.signin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signIn() {
    this.submitted = true;
    if (this.signin.invalid) {
      return;
    }

    this.authService.signIn(this.signin.value).subscribe((data: any) => {
      localStorage.setItem('token', JSON.stringify(data.data));
      this.router.navigate(['tabs/home']);
    },
      (error) => {
        console.log('error')
      })
  }

  signInWithGoogle(): void {
    this.authSocService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authSocService.signIn(FacebookLoginProvider.PROVIDER_ID);
  } 
 
  signOut(): void {
    this.authSocService.signOut();
  }
}
