import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';

import { AuthGuard } from './core/guards/auth.guard';
import { Role } from './core/models/role.enum';

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
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
    data: { role: Role.ADMIN }
  },
  {
    path: 'profesor',
    loadChildren: './professor/professor.module#ProfessorModule',
    canActivate: [AuthGuard],
    data: { role: Role.PROFESSOR }
  },
  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule',
    canActivate: [AuthGuard],
    data: { role: Role.STUDENT }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
