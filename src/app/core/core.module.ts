import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

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
