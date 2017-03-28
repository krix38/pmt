import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PasswordModule,
         InputTextModule,
         PanelModule,
         ButtonModule,
         MenubarModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'
import { CreatorComponent } from './components/creator/creator.component'
import { CreatorMenuComponent } from './components/creatorMenu/creator-menu.component'

import { AuthGuard }                from './services/auth-guard.service';
import { AuthService }                from './services/auth.service';
import { AppRoutingModule }     from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreatorComponent,
    CreatorMenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    MenubarModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
