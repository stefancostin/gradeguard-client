import { Component, OnInit } from '@angular/core';
import { Semester } from 'src/app/core/models/semester.enum';
import { Year } from 'src/app/core/models/year.enum';

@Component({
  selector: 'grd-student-controls',
  templateUrl: './student-controls.component.html',
  styleUrls: ['./student-controls.component.scss']
})
export class StudentControlsComponent implements OnInit {
  
  Semester = Semester;
  Year = Year;

  constructor() { }

  ngOnInit() {
  }

  isYearDisabled(year: Year): boolean {
    return year === Year.III;
  }

  isSemDisabled(semester: Semester): boolean {
    return semester === Semester.II;
  }

}
