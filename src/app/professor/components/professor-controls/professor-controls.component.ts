import { Component, OnInit } from '@angular/core';
import { Mode } from 'src/app/core/models/mode.enum';
import { Semester } from 'src/app/core/models/semester.enum';
import { Year } from 'src/app/core/models/year.enum';

@Component({
  selector: 'grd-professor-controls',
  templateUrl: './professor-controls.component.html',
  styleUrls: ['./professor-controls.component.scss']
})
export class ProfessorControlsComponent implements OnInit {

  Mode = Mode;
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
