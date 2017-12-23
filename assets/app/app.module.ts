import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";



import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { routing } from './app.routing';

import { ErrorComponent } from './error/error.component';
import { ErrorService } from './error/error.service';
import { AuthService } from './auth/auth.service';
import { MessageModule } from './messages/message.module';

@NgModule({
    declarations: [AppComponent, 
                   
                   AuthenticationComponent,
                   HeaderComponent,
                   ErrorComponent


    ],
    imports: [
        BrowserModule, 
        routing, 
        ReactiveFormsModule,
        HttpModule,
        MessageModule

    ],
    providers:[AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}