import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    AngularFontAwesomeModule
  ],
  declarations: [LoginComponent, HeaderComponent, HomeComponent],
  exports: [HeaderComponent, HomeComponent]
})
export class CoreModule { }
