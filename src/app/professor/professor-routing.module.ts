import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { GradeControlsComponent } from './components/grade-controls/grade-controls.component';

const routes: Routes = [
  {
    path: '',
    component: ProfessorDashboardComponent
  },
  {
    path: 'note',
    component: GradeControlsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
