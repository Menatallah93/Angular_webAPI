import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeLinkedinComponent } from './home-linkedin/home-linkedin.component';
import { LoginComponent } from './login/login.component';
import { RegestrationComponent } from './regestration/regestration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeLinkedinComponent,
    LoginComponent,
    RegestrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
