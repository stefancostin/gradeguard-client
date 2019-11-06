import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select'; 
import { MatTableModule } from '@angular/material/table';

import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { ProfessorControlsComponent } from './components/professor-controls/professor-controls.component';

@NgModule({
  imports: [
    CommonModule,
    ProfessorRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatTableModule
  ],
  declarations: [ProfessorDashboardComponent, ProfessorControlsComponent]
})
export class ProfessorModule { }
