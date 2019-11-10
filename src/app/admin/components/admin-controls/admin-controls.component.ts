import { Component, OnInit, Input } from '@angular/core';
import { AdminView, AdminAction, AdminRoute } from 'src/app/core/models/admin.enum';
import { Mode } from 'src/app/core/models/mode.enum';
import { Semester } from 'src/app/core/models/semester.enum';
import { Year } from 'src/app/core/models/year.enum';

@Component({
  selector: 'grd-admin-controls',
  templateUrl: './admin-controls.component.html',
  styleUrls: ['./admin-controls.component.scss']
})
export class AdminControlsComponent implements OnInit {

  @Input() adminView: AdminView;
  actionName: string;
  opRoute: string;

  AdminView = AdminView;
  Mode = Mode;
  Semester = Semester;
  Year = Year;

  constructor() { }

  ngOnInit() {
    this.setAdminAction();
  }

  isYearDisabled(year: Year): boolean {
    return year === Year.III;
  }

  isSemDisabled(semester: Semester): boolean {
    return semester === Semester.II;
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
