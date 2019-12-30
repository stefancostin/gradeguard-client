import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mode } from 'src/app/core/models/mode.enum';

@Component({
  selector: 'grd-professor-controls',
  templateUrl: './professor-controls.component.html',
  styleUrls: ['./professor-controls.component.scss']
})
export class ProfessorControlsComponent implements OnInit {

  Mode = Mode;
  @Input() subjectList: Array<any>;
  @Input() subjectSelected: string;
  @Output() changeFilter: EventEmitter<any>;

  constructor() {
    this.changeFilter = new EventEmitter();
  }

  ngOnInit() {
  }

  changeSubjectFilter() {
    const filter = { subjectSelected: this.subjectSelected };
    this.changeFilter.emit(filter);
  }

}
