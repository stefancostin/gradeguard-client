import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminProfessorsComponent } from './components/admin-professors/admin-professors.component';
import { AdminSubjectsComponent } from './components/admin-subjects/admin-subjects.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'materie',
        component: AdminSubjectsComponent
      },
      {
        path: 'profesor',
        component: AdminProfessorsComponent
      },
      {
        path: 'student',
        component: AdminProfessorsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
