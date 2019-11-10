import { Component, OnInit } from '@angular/core';
import { AdminView } from 'src/app/core/models/admin.enum';

const ELEMENT_DATA = [
  {lastName: 'Costin', firstName: 'Stefan', year: 'I'},
  {lastName: 'Saratian', firstName: 'Andreea', year: 'I'},
  {lastName: 'Popa', firstName: 'Andrei', year: 'I'},
  {lastName: 'Popa', firstName: 'Dragos', year: 'I'},
  {lastName: 'Matrana', firstName: 'Karina', year: 'I'},
  {lastName: 'Dolanescu', firstName: 'Ion', year: 'I'},
  {lastName: 'Botezatu', firstName: 'Andra', year: 'I'},
];

@Component({
  selector: 'grd-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.scss']
})
export class AdminStudentsComponent implements OnInit {

  displayedColumns: string[] = ['lastName', 'firstName', 'year'];
  dataSource = ELEMENT_DATA;

  AdminView = AdminView;

  constructor() { }

  ngOnInit() {
  }

}
