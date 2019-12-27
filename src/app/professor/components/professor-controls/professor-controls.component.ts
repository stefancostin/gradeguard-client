import { Component, OnInit } from '@angular/core';
import { Mode } from 'src/app/core/models/mode.enum';
import { Semester } from 'src/app/core/models/semester.enum';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';

@Component({
  selector: 'grd-professor-controls',
  templateUrl: './professor-controls.component.html',
  styleUrls: ['./professor-controls.component.scss']
})
export class ProfessorControlsComponent implements OnInit {

  Mode = Mode;
  Semester = Semester;
  Year = YearOfStudy;

  constructor() { }

  ngOnInit() {
  }

  isYearDisabled(year: YearOfStudy): boolean {
    return year === YearOfStudy.III;
  }

  isSemDisabled(semester: Semester): boolean {
    return semester === Semester.II;
  }

}
