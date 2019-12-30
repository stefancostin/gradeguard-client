import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { ProfessorControlsComponent } from './components/professor-controls/professor-controls.component';
import { GradeControlsComponent } from './components/grade-controls/grade-controls.component';

@NgModule({
  imports: [
    CommonModule,
    ProfessorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule
  ],
  declarations: [ProfessorDashboardComponent, ProfessorControlsComponent, GradeControlsComponent]
})
export class ProfessorModule { }
