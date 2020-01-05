import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminControlsComponent } from './components/admin-controls/admin-controls.component';
import { AdminCrudOperationsComponent } from './components/admin-crud-operations/admin-crud-operations.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminStudentsComponent } from './components/admin-students/admin-students.component';
import { AdminProfessorsComponent } from './components/admin-professors/admin-professors.component';
import { AdminSubjectsComponent } from './components/admin-subjects/admin-subjects.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule
  ],
  declarations: [
    AdminControlsComponent,
    AdminCrudOperationsComponent,
    AdminDashboardComponent,
    AdminStudentsComponent,
    AdminProfessorsComponent,
    AdminSubjectsComponent
  ]
})
export class AdminModule { }
