import { Component } from '@angular/core';
@Component({
    selector:'app-header',
    template:`
    <nav>
    <ul class="nav nav-pills">
    <li routerLinkActive="active"><a [routerLink]="['/messages']">Messages</a></li>
    <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
    
    </ul>

    </nav>
    `,
    style
})
export class HeaderComponent{}