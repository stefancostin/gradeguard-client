import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRoute, AdminView } from '../core/models/admin.enum';

import { AdminCrudOperationsComponent } from './components/admin-crud-operations/admin-crud-operations.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminStudentsComponent } from './components/admin-students/admin-students.component';
import { AdminSubjectsComponent } from './components/admin-subjects/admin-subjects.component';
import { AdminProfessorsComponent } from './components/admin-professors/admin-professors.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: AdminRoute[AdminView.SUBJECT],
        component: AdminSubjectsComponent
      },
      {
        path: AdminRoute[AdminView.PROFESSOR],
        component: AdminProfessorsComponent
      },
      {
        path: AdminRoute[AdminView.STUDENT],
        component: AdminStudentsComponent
      }
    ]
  },
  {
    path: 'modificari',
    children: [
      {
        path: AdminRoute[AdminView.SUBJECT],
        component: AdminCrudOperationsComponent
      },
      {
        path: AdminRoute[AdminView.PROFESSOR],
        component: AdminCrudOperationsComponent
      },
      {
        path: AdminRoute[AdminView.STUDENT],
        component: AdminCrudOperationsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
