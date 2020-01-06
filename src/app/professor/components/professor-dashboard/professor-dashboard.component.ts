import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfessorService } from '../../services/professor.service';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'grd-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.scss']
})
export class ProfessorDashboardComponent implements OnInit, OnDestroy {

  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[];
  public subjectList: Array<any>;
  public subjectSelected: any;
  private professorId: number;
  private professorDataSubscription: Subscription;
  private professorGradesSubscription: Subscription;

  constructor(private readonly professorService: ProfessorService,
    private readonly alertService: AlertService) {

    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      'lastName',
      'firstName',
      'gradeLaboratory',
      'gradeProject',
      'gradeExam',
      'gradeFinal'
    ];
    this.professorDataSubscription = new Subscription();
    this.professorGradesSubscription = new Subscription();

    // HARDCODED
    this.professorId = 4;
  }

  ngOnInit() {
    this.getProfessorData();
  }

  ngOnDestroy() {
    if (this.professorDataSubscription) {
      this.professorDataSubscription.unsubscribe();
    }
    if (this.professorGradesSubscription) {
      this.professorGradesSubscription.unsubscribe();
    }
  }

  onFilterChange(filter) {
    this.subjectSelected = filter.subjectSelected;
    this.getProfessorGrades();
  }

  private getProfessorData() {
    this.professorDataSubscription = this.professorService.getProfessorData(this.professorId)
      .subscribe((response: any) => {
        this.subjectList = response;
        this.subjectSelected = (response && response.length) ? response[0] : null;

        this.getProfessorGrades();
      }, (error) => {
        this.alertService.danger(error.message);
      });
  }

  private getProfessorGrades() {
    if (this.subjectSelected) {
      this.professorGradesSubscription = this.professorService.getProfessorGrades(this.subjectSelected.id)
        .subscribe((response: any) => {
          this.dataSource = new MatTableDataSource(response);
        }, (error) => {
          this.alertService.danger(error.message);
        });
    }
  }

}
