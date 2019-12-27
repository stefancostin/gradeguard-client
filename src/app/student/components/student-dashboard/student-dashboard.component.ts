import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { MatTableDataSource } from '@angular/material/table';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';
import { Semester } from 'src/app/core/models/semester.enum';
import { ContextService } from 'src/app/core/services/context.service';

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
  selector: 'grd-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<any>;
  public yearOfStudy: YearOfStudy;
  public semester: Semester;
  private studentId: number;

  constructor(private readonly studentService: StudentService,
    private readonly contextService: ContextService) {

    this.displayedColumns = [
      'subjectCode',
      'subjectName',
      'gradeLaboratory',
      'gradeProject',
      'gradeExam',
      'gradeFinal'
    ];
    this.dataSource = new MatTableDataSource();
    this.semester = this.contextService.getSemester();

    // HARDCODED
    this.studentId = 1;
  }

  ngOnInit() {
    this.getStudentData();
  }

  public onFilterChange(filter) {
    this.yearOfStudy = filter.yearOfStudy;
    this.semester = filter.semester;

    this.getStudentGrades();
  }

  private getStudentData() {
    this.studentService.getStudentData(this.studentId).subscribe((response: any) => {
      this.yearOfStudy = response.yearOfStudy;

      this.getStudentGrades();
    });
  }

  private getStudentGrades() {
    this.studentService.getStudentGrades(this.studentId, this.yearOfStudy, this.semester).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }

}
