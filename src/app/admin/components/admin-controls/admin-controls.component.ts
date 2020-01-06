import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AdminView, AdminAction, AdminRoute } from 'src/app/core/models/admin.enum';
import { Mode } from 'src/app/core/models/mode.enum';
import { Semester } from 'src/app/core/models/semester.enum';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';

@Component({
  selector: 'grd-admin-controls',
  templateUrl: './admin-controls.component.html',
  styleUrls: ['./admin-controls.component.scss']
})
export class AdminControlsComponent implements OnInit {

  @Input() adminView: AdminView;
  @Output() yearOfStudyEvent: EventEmitter<YearOfStudy>;
  @Output() semesterEvent: EventEmitter<Semester>;
  actionName: string;
  opRoute: string;
  semesterSelected: Semester;
  yearOfStudySelected: YearOfStudy;

  AdminView = AdminView;
  Mode = Mode;
  Semester = Semester;
  Year = YearOfStudy;

  constructor() {
    this.semesterEvent = new EventEmitter();
    this.semesterSelected = Semester.I;
    this.yearOfStudyEvent = new EventEmitter();
    this.yearOfStudySelected = YearOfStudy.I;
   }

  ngOnInit() {
    this.setAdminAction();
  }

  isYearDisabled(year: YearOfStudy): boolean {
    return year === YearOfStudy.III;
  }

  isSemDisabled(semester: Semester): boolean {
    return semester === Semester.II;
  }

  updateYearOfStudy() {
    this.yearOfStudyEvent.emit(this.yearOfStudySelected);
  }

  updateSemester() {
    this.semesterEvent.emit(this.semesterSelected);
  }

  private setAdminAction() {
    switch (this.adminView) {
      case AdminView.PROFESSOR:
        this.actionName = AdminAction[AdminView.PROFESSOR];
        this.opRoute = AdminRoute[AdminView.PROFESSOR];
        break;
      case AdminView.STUDENT:
        this.actionName = AdminAction[AdminView.STUDENT];
        this.opRoute = AdminRoute[AdminView.STUDENT];
        break;
      case AdminView.SUBJECT:
        this.actionName = AdminAction[AdminView.SUBJECT];
        this.opRoute = AdminRoute[AdminView.SUBJECT];
        break;
      default:
        this.actionName = null;
    }
  }

}
