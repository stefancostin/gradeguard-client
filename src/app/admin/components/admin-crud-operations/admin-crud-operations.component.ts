import { Component, OnInit } from '@angular/core';
import { Mode } from 'src/app/core/models/mode.enum';
import { Router } from '@angular/router';
import { AdminView, AdminRoute } from 'src/app/core/models/admin.enum';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';

@Component({
  selector: 'grd-admin-crud-operations',
  templateUrl: './admin-crud-operations.component.html',
  styleUrls: ['./admin-crud-operations.component.scss']
})
export class AdminCrudOperationsComponent implements OnInit {

  view: AdminView;
  AdminView = AdminView;
  Mode = Mode;
  Year = YearOfStudy;

  professorList = [
    { id: 1, name: 'Stefan Costin' },
    { id: 2, name: 'Andreea Saratian' },
    { id: 3, name: 'Andrei Popa' },
    { id: 4, name: 'Karina Matrana' },
    { id: 5, name: 'Dragos Popa' },
    { id: 6, name: 'David Popa' },
    { id: 7, name: 'Andra Botezatu' },
  ];

  studentList = [
    {id: 1, name: 'Stefan Costin'},
    {id: 2, name: 'Andreea Saratian'},
    {id: 3, name: 'Andrei Popa'},
    {id: 4, name: 'Karina Matrana'},
    {id: 5, name: 'Dragos Popa'},
    {id: 6, name: 'David Popa'},
    {id: 7, name: 'Andra Botezatu'},
  ];

  subjectList = [
    { id: 1, title: 'SCC' },
    { id: 2, title: 'LTW' },
    { id: 3, title: 'CC' },
    { id: 4, title: 'FPD' },
    { id: 5, title: 'MSR' },
  ];

  constructor(private readonly router: Router) { }

  ngOnInit() {
    const currentPage: string = this.setCurrentPageFromUrl();
    this.setCurrentPageView(currentPage);
  }

  isYearDisabled(year: YearOfStudy): boolean {
    return year === YearOfStudy.III;
  }

  // isSemDisabled(semester: Semester): boolean {
  //   return semester === Semester.II;
  // }

  private setCurrentPageFromUrl(): string {
    return this.router.url.split('/').pop().split('?').slice(0, 1).join();
  }

  private setCurrentPageView(currentPage: string) {
    switch (currentPage) {
      case AdminRoute[AdminView.PROFESSOR]:
        this.view = AdminView.PROFESSOR;
        break;
      case AdminRoute[AdminView.STUDENT]:
        this.view = AdminView.STUDENT;
        break;
      case AdminRoute[AdminView.SUBJECT]:
        this.view = AdminView.SUBJECT;
        break;
      default:
        this.view = null;
    }
  }

}
