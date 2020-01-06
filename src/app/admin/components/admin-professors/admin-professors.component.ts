import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminView, AdminRoute } from 'src/app/core/models/admin.enum';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Mode } from 'src/app/core/models/mode.enum';
import { AlertService } from 'ngx-alerts';

const ELEMENT_DATA = [
  { lastName: 'Pinzariu', firstName: 'Sorin', subject: 'LTW', year: 'I' },
  { lastName: 'Piclea', firstName: 'Andrei', subject: 'SSC', year: 'I' },
  { lastName: 'Onofrei', firstName: 'Virgiliu', subject: 'FPD', year: 'I' },
  { lastName: 'Gaman', firstName: 'Andrei', subject: 'MSR', year: 'I' },
  { lastName: 'Popa', firstName: 'David', subject: 'ETC', year: 'I' },
  { lastName: 'Dolanescu', firstName: 'Ion', subject: 'OOP', year: 'I' },
  { lastName: 'Botezatu', firstName: 'Andra', subject: 'CC', year: 'I' },
];

@Component({
  selector: 'grd-admin-professors',
  templateUrl: './admin-professors.component.html',
  styleUrls: ['./admin-professors.component.scss']
})
export class AdminProfessorsComponent implements OnInit, OnDestroy {

  public AdminRoute = AdminRoute;
  public AdminView = AdminView;
  public Mode = Mode;
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[];
  private professorsListSubscription: Subscription;
  private professorsRemoveSubscription: Subscription;

  constructor(private readonly router: Router,
    private readonly adminService: AdminService,
    private readonly alertService: AlertService) {

    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      'lastName',
      'firstName',
      'email',
      'subject',
      'actions'
    ];
    this.professorsListSubscription = new Subscription();
    this.professorsRemoveSubscription = new Subscription();
  }

  ngOnInit() {
    this.getProfessorsList();
  }

  ngOnDestroy() {
    if (this.professorsListSubscription) {
      this.professorsListSubscription.unsubscribe();
    }
    if (this.professorsRemoveSubscription) {
      this.professorsRemoveSubscription.unsubscribe();
    }
  }

  public editProfessor(professorId: number) {
    this.router.navigateByUrl(`/admin/modificari/${AdminRoute[AdminView.PROFESSOR]}?mode=${Mode.EDIT}&professorId=${professorId}`);
  }

  public removeProfessor(professorId: number) {
    const deletionConfirmed = confirm('Esti sigur ca vrei sa faci aceasta actiune?');
    if (deletionConfirmed) {
      this.professorsRemoveSubscription = this.adminService.removeUser(professorId)
        .subscribe((response: any) => {
          this.alertService.info('Professor entity has been removed.');
          this.getProfessorsList();

        }, (error) => {
          this.alertService.danger(error.message);
        });
    }
  }

  private getProfessorsList() {
    this.professorsListSubscription = this.adminService.getProfessorsList()
      .subscribe((response: any) => {
        this.dataSource = new MatTableDataSource(response);
      }, (error) => {
        this.alertService.danger(error.message);
      });
  }

}
