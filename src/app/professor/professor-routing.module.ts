import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ProfessorDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
