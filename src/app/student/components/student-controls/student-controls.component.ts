import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Semester } from 'src/app/core/models/semester.enum';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';

@Component({
  selector: 'grd-student-controls',
  templateUrl: './student-controls.component.html',
  styleUrls: ['./student-controls.component.scss']
})
export class StudentControlsComponent implements OnInit {

  @Input() semester: Semester;
  @Input() yearOfStudy: YearOfStudy;
  @Output() changeFilter: EventEmitter<any>;

  Semester = Semester;
  YearOfStudy = YearOfStudy;

  constructor() {
    this.changeFilter = new EventEmitter();
  }

  ngOnInit() {
  }

  changeStudentGradesFilter() {
    const filter = { yearOfStudy: this.yearOfStudy, semester: this.semester };
    this.changeFilter.emit(filter);
  }

}
