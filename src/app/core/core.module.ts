import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AlertModule } from 'ngx-alerts';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    AngularFontAwesomeModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})
  ],
  declarations: [LoginComponent, HeaderComponent, HomeComponent],
  exports: [AlertModule, HeaderComponent, HomeComponent]
})
export class CoreModule { }
