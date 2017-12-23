import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector:'app-auth',
    template:`
    <nav>
    <ul class="nav nav-tabs">
    <li><a [routerLink]="['signup']">Signup</a></li>
    <li *ngIf="!IsLoggedIn()"><a [routerLink]="['signin']">Signin</a></li>
    <li *ngIf="IsLoggedIn()"><a [routerLink]="['logout']">Logout</a></li>
    
    </ul>
    </nav>
    <div class="row spacing">
    <router-outlet></router-outlet>
    </div>
    `
})
export class AuthenticationComponent{

    constructor(private authService:AuthService){}

    IsLoggedIn(){
        return this.authService.IsLoggedIn();
    }
}