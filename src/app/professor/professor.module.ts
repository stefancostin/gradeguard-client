import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { ProfessorControlsComponent } from './components/professor-controls/professor-controls.component';

@NgModule({
  imports: [
    CommonModule,
    ProfessorRoutingModule
  ],
  declarations: [ProfessorDashboardComponent, ProfessorControlsComponent]
})
export class ProfessorModule { }
