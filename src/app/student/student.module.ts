import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentControlsComponent } from './components/student-controls/student-controls.component';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatTableModule
  ],
  declarations: [StudentDashboardComponent, StudentControlsComponent]
})
export class StudentModule { }
