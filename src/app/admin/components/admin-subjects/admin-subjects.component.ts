import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminView, AdminRoute } from 'src/app/core/models/admin.enum';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Mode } from 'src/app/core/models/mode.enum';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';
import { Semester } from 'src/app/core/models/semester.enum';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'grd-admin-subjects',
  templateUrl: './admin-subjects.component.html',
  styleUrls: ['./admin-subjects.component.scss']
})
export class AdminSubjectsComponent implements OnInit, OnDestroy {

  public AdminView = AdminView;
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[];
  private semester: Semester;
  private subjectsListSubscription: Subscription;
  private subjectsRemoveSubscription: Subscription;
  private yearOfStudy: YearOfStudy;

  constructor(private readonly router: Router,
    private readonly adminService: AdminService,
    private readonly alertService: AlertService) {

    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      'name',
      'acronym',
      'year',
      'semester',
      'professors',
      'actions'
    ];
    this.semester = Semester.I;
    this.yearOfStudy = YearOfStudy.I;
    this.subjectsListSubscription = new Subscription();
    this.subjectsRemoveSubscription = new Subscription();
  }

  ngOnInit() {
    this.getSubjectsList();
  }

  ngOnDestroy() {
    if (this.subjectsListSubscription) {
      this.subjectsListSubscription.unsubscribe();
    }
    if (this.subjectsRemoveSubscription) {
      this.subjectsRemoveSubscription.unsubscribe();
    }
  }

  editSubject(subjectId: number) {
    this.router.navigateByUrl(`/admin/modificari/${AdminRoute[AdminView.SUBJECT]}?mode=${Mode.EDIT}&subjectId=${subjectId}`);
  }

  removeSubject(subjectId: number) {
    const deletionConfirmed = confirm('Esti sigur ca vrei sa faci aceasta actiune?');
    if (deletionConfirmed) {
      this.subjectsRemoveSubscription = this.adminService.removeSubject(subjectId)
        .subscribe((response: any) => {
          this.alertService.info('Subject entity has been removed.');
          this.getSubjectsList();

        }, (error) => {
          this.alertService.danger(error.message);
        });
    }
  }

  onYearOfStudyUpdate(yearOfStudy: YearOfStudy) {
    this.yearOfStudy = yearOfStudy;
    this.getSubjectsList();
  }

  onSemesterUpdate(semester: Semester) {
    this.semester = semester;
    this.getSubjectsList();
  }

  private getSubjectsList() {
    this.subjectsListSubscription = this.adminService.getSubjectsList(this.yearOfStudy, this.semester)
      .subscribe((response: any) => {
        this.dataSource = new MatTableDataSource(response);
      }, (error) => {
        this.alertService.danger(error.message);
      });
  }


}
