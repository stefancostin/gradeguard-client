import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminStudentsComponent } from './components/admin-students/admin-students.component';
import { AdminProfessorsComponent } from './components/admin-professors/admin-professors.component';
import { AdminSubjectsComponent } from './components/admin-subjects/admin-subjects.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AdminDashboardComponent, AdminStudentsComponent, AdminProfessorsComponent, AdminSubjectsComponent]
})
export class AdminModule { }
