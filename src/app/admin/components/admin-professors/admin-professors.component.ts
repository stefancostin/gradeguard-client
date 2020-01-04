import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminView } from 'src/app/core/models/admin.enum';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

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

  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[];
  public AdminView = AdminView;
  private professorsListSubscription: Subscription;

  constructor(private readonly adminService: AdminService) {

    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      'lastName',
      'firstName',
      'email',
      'subject',
      'actions'
    ];
    this.professorsListSubscription = new Subscription();
  }

  ngOnInit() {
    this.getProfessorsList();
  }

  ngOnDestroy() {
    if (this.professorsListSubscription) {
      this.professorsListSubscription.unsubscribe();
    }
  }

  public removeProfessor(professorId: any) {
    const deletionConfirmed = confirm('Esti sigur ca vrei sa faci aceasta actiune?');
    // if (deletionConfirmed) {
    //   this.professorService.removeGrade(gradeId).subscribe((response: any) => {
    //   });
    // }
  }

  private getProfessorsList() {
    this.professorsListSubscription = this.adminService.getProfessorsList().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }

}
