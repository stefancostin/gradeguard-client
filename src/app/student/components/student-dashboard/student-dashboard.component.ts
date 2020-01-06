import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { MatTableDataSource } from '@angular/material/table';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';
import { Semester } from 'src/app/core/models/semester.enum';
import { ContextService } from 'src/app/core/services/context.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'grd-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit, OnDestroy {

  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[];
  public yearOfStudy: YearOfStudy;
  public semester: Semester;
  private studentId: number;
  private studentDataSubscription: Subscription;
  private studentGradesSubscription: Subscription;

  constructor(private readonly studentService: StudentService,
    private readonly contextService: ContextService,
    private readonly alertService: AlertService) {

    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      'subjectCode',
      'subjectName',
      'gradeLaboratory',
      'gradeProject',
      'gradeExam',
      'gradeFinal'
    ];
    this.semester = this.contextService.getSemester();
    this.studentDataSubscription = new Subscription();
    this.studentGradesSubscription = new Subscription();

    // HARDCODED
    this.studentId = 1;
  }

  ngOnInit() {
    this.getStudentData();
  }

  ngOnDestroy() {
    if (this.studentDataSubscription) {
      this.studentDataSubscription.unsubscribe();
    }
    if (this.studentGradesSubscription) {
      this.studentGradesSubscription.unsubscribe();
    }
  }

  onFilterChange(filter) {
    this.yearOfStudy = filter.yearOfStudy;
    this.semester = filter.semester;

    this.getStudentGrades();
  }

  private getStudentData() {
    this.studentDataSubscription = this.studentService.getStudentData(this.studentId)
    .subscribe((response: any) => {
      this.yearOfStudy = response.yearOfStudy;

      this.getStudentGrades();
    }, (error) => {
      this.alertService.danger(error.message);
    });
  }

  private getStudentGrades() {
    this.studentGradesSubscription = this.studentService.getStudentGrades(this.studentId, this.yearOfStudy, this.semester)
    .subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    }, (error) => {
      this.alertService.danger(error.message);
    });
  }

}
