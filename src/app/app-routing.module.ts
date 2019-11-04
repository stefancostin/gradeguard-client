import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: '../app/admin/admin.module#AdminModule'
  },
  {
    path: 'professor',
    loadChildren: '../app/professor/professor.module#ProfessorModule'
  },
  {
    path: 'student',
    loadChildren: '../app/student/student.module#StudentModule'
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
