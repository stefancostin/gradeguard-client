import { Component, OnInit } from '@angular/core';
import { AdminView } from 'src/app/core/models/admin.enum';

const ELEMENT_DATA = [
  {lastName: 'Pinzariu', firstName: 'Sorin', subject: 'LTW', year: 'I', semester: 'II'},
  {lastName: 'Piclea', firstName: 'Andrei', subject: 'SSC', year: 'I', semester: 'II'},
  {lastName: 'Onofrei', firstName: 'Virgiliu', subject: 'FPD', year: 'I', semester: 'II'},
  {lastName: 'Gaman', firstName: 'Andrei', subject: 'MSR', year: 'I', semester: 'II'},
  {lastName: 'Popa', firstName: 'David', subject: 'ETC', year: 'I', semester: 'II'},
  {lastName: 'Dolanescu', firstName: 'Ion', subject: 'OOP', year: 'I', semester: 'II'},
  {lastName: 'Botezatu', firstName: 'Andra', subject: 'CC', year: 'I', semester: 'II'},
];

@Component({
  selector: 'grd-admin-subjects',
  templateUrl: './admin-subjects.component.html',
  styleUrls: ['./admin-subjects.component.scss']
})
export class AdminSubjectsComponent implements OnInit {

  displayedColumns: string[] = ['subject', 'year', 'semester', 'lastName', 'firstName'];
  dataSource = ELEMENT_DATA;

  AdminView = AdminView;

  constructor() { }

  ngOnInit() {
  }

}
