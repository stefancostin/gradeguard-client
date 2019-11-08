import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA = [
  {subject: 'LTW', labGrade: 9, projectGrade: 10, examGrade: 5, finalGrade: 7},
  {subject: 'SSC', labGrade: 10, projectGrade: 9, examGrade: 4, finalGrade: 8},
  {subject: 'FPD', labGrade: 5, projectGrade: 10, examGrade: 9, finalGrade: 8},
  {subject: 'MSR', labGrade: 4, projectGrade: 7, examGrade: 8, finalGrade: 7},
  {subject: 'ETC', labGrade: 7, projectGrade: 9, examGrade: 9, finalGrade: 8},
  {subject: 'OOP', labGrade: 10, projectGrade: 6, examGrade: 7, finalGrade: 9},
  {subject: 'CC', labGrade: 8, projectGrade: 8, examGrade: 5, finalGrade: 7},
];

@Component({
  selector: 'grd-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.scss']
})
export class ProfessorDashboardComponent implements OnInit {

  displayedColumns: string[] = ['subject', 'labGrade', 'projectGrade', 'examGrade', 'finalGrade'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
