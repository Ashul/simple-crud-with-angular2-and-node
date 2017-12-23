import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector:'app-logout',
    template:`
    <button class="btn btn-danger" (click)="onLogout()">Logout</button>
    `
})
export class LogoutComponent{

    constructor(private authService:AuthService, private router:Router){}
    onLogout(){
        this.authService.logoout();
        this.router.navigate(['/auth', 'signin'])
    }
}