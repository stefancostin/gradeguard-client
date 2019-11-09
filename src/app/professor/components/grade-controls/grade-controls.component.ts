import { Component, OnInit } from '@angular/core';
import { Mode } from '../../models/mode.enum';

@Component({
  selector: 'grd-grade-controls',
  templateUrl: './grade-controls.component.html',
  styleUrls: ['./grade-controls.component.scss']
})
export class GradeControlsComponent implements OnInit {

  Mode = Mode;

  studentList = [
    {id: 1, student: 'Stefan Costin'},
    {id: 2, student: 'Andreea Saratian'},
    {id: 3, student: 'Andrei Popa'},
    {id: 4, student: 'Karina Matrana'},
    {id: 5, student: 'Dragos Popa'},
    {id: 6, student: 'David Popa'},
    {id: 7, student: 'Andra Botezatu'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
