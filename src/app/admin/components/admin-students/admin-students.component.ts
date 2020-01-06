import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminView, AdminRoute } from 'src/app/core/models/admin.enum';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';
import { Mode } from 'src/app/core/models/mode.enum';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'grd-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.scss']
})
export class AdminStudentsComponent implements OnInit, OnDestroy {

  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[];
  public AdminView = AdminView;
  public yearOfStudy: YearOfStudy;

  private studentsListSubscription: Subscription;
  private studentsRemoveSubscription: Subscription;

  constructor(private readonly router: Router,
    private readonly adminService: AdminService,
    private readonly alertService: AlertService) {

    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      'lastName',
      'firstName',
      'email',
      'year',
      'actions'
    ];
    this.yearOfStudy = YearOfStudy.I;
  }

  ngOnInit() {
    this.getStudentsList();
  }

  ngOnDestroy() {
    if (this.studentsListSubscription) {
      this.studentsListSubscription.unsubscribe();
    }
    if (this.studentsRemoveSubscription) {
      this.studentsRemoveSubscription.unsubscribe();
    }
  }

  editStudent(studentId: number) {
    this.router.navigateByUrl(`/admin/modificari/${AdminRoute[AdminView.STUDENT]}?mode=${Mode.EDIT}&studentId=${studentId}`);
  }

  removeStudent(studentId: number) {
    const deletionConfirmed = confirm('Esti sigur ca vrei sa faci aceasta actiune?');
    if (deletionConfirmed) {
      this.studentsRemoveSubscription = this.adminService.removeUser(studentId)
        .subscribe((response: any) => {
          this.alertService.info('Student entity has been removed.');
          this.getStudentsList();

        }, (error) => {
          this.alertService.danger(error.message);
        });
    }
  }

  onYearOfStudyUpdate(yearOfStudy: YearOfStudy) {
    this.yearOfStudy = yearOfStudy;
    this.getStudentsList();
  }

  private getStudentsList() {
    this.studentsListSubscription = this.adminService.getStudentsList(this.yearOfStudy)
      .subscribe((response: any) => {
        this.dataSource = new MatTableDataSource(response);
      }, (error) => {
        this.alertService.danger(error.message);
      });
  }

}
