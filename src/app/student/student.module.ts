import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentControlsComponent } from './components/student-controls/student-controls.component';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule
  ],
  declarations: [StudentDashboardComponent, StudentControlsComponent]
})
export class StudentModule { }
