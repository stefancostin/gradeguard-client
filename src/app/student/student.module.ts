import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentControlsComponent } from './components/student-controls/student-controls.component';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatButtonModule,
    MatTableModule
  ],
  declarations: [StudentDashboardComponent, StudentControlsComponent]
})
export class StudentModule { }
