import { Component, OnInit } from '@angular/core';
import { AdminView } from 'src/app/core/models/admin.enum';

const ELEMENT_DATA = [
  {lastName: 'Pinzariu', firstName: 'Sorin', subject: 'LTW', year: 'I'},
  {lastName: 'Piclea', firstName: 'Andrei', subject: 'SSC', year: 'I'},
  {lastName: 'Onofrei', firstName: 'Virgiliu', subject: 'FPD', year: 'I'},
  {lastName: 'Gaman', firstName: 'Andrei', subject: 'MSR', year: 'I'},
  {lastName: 'Popa', firstName: 'David', subject: 'ETC', year: 'I'},
  {lastName: 'Dolanescu', firstName: 'Ion', subject: 'OOP', year: 'I'},
  {lastName: 'Botezatu', firstName: 'Andra', subject: 'CC', year: 'I'},
];

@Component({
  selector: 'grd-admin-professors',
  templateUrl: './admin-professors.component.html',
  styleUrls: ['./admin-professors.component.scss']
})
export class AdminProfessorsComponent implements OnInit {

  displayedColumns: string[] = ['lastName', 'firstName', 'subject', 'year', 'actions'];
  dataSource = ELEMENT_DATA;

  AdminView = AdminView;

  constructor() { }

  ngOnInit() {
  }

  removeProfessor(professorId: any) {
    const deletionConfirmed = confirm('Esti sigur ca vrei sa faci aceasta actiune?');
    // if (deletionConfirmed) {
    //   this.professorService.removeGrade(gradeId).subscribe((response: any) => {
    //   });
    // }
  }

}
