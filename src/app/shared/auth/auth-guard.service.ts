import {CanActivate, CanDeactivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanDeactivate<any> {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }
        return  this.authService.isLoggedIn();
    }

    canDeactivate(): boolean{
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }
        return  this.authService.isLoggedIn();
    }


}
