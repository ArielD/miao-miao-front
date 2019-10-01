//Vendors
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//services
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.authenticationService.getCurrentUser().subscribe((x) => {
            this.authenticationService.setCurrentUserSubject(x)
          });

        const currentUser = this.authenticationService.getCurrentUserValue();

        if (currentUser) {
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                //this.router.navigate(['/404']);
                return false;
            }       
            return true;
        }

        this.router.navigate(['auth/signin'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}