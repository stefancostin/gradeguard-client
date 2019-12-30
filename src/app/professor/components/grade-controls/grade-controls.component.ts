import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mode } from 'src/app/core/models/mode.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import { Subscriber, Subscription } from 'rxjs';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';

@Component({
  selector: 'grd-grade-controls',
  templateUrl: './grade-controls.component.html',
  styleUrls: ['./grade-controls.component.scss']
})
export class GradeControlsComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public Mode = Mode;
  public studentList: Array<any>;
  public studentSelected: any;
  public subjectList: Array<any>;
  public subjectSelected: any;
  private professorId: number;
  private professorDataSubscription: Subscription;
  private professorGradesSubscription: Subscription;
  private yearOfStudy: YearOfStudy;

  constructor(private readonly fb: FormBuilder,
    private readonly professorService: ProfessorService) {

    this.professorDataSubscription = new Subscription();
    this.professorGradesSubscription = new Subscription();

    // HARDCODED
    this.professorId = 4;
  }

  ngOnInit() {
    this.initForm();
    this.getProfessorData();

    // HARDCODED
    this.form.patchValue({ professorId: this.professorId });
  }

  ngOnDestroy() {
    if (this.professorDataSubscription) {
      this.professorDataSubscription.unsubscribe();
    }
    if (this.professorGradesSubscription) {
      this.professorGradesSubscription.unsubscribe();
    }
  }

  changeStudent() {
    this.getStudentData();
  }

  changeSubject() {
    this.getStudentData();
    this.form.patchValue({ subjectId: this.subjectSelected.id });
  }

  private getProfessorData() {
    this.professorDataSubscription = this.professorService.getProfessorData(this.professorId)
    .subscribe((response: any) => {
      this.subjectList = response;
      this.subjectSelected = (response && response.length) ? response[0] : null;

      this.getStudentData();
    });
  }

  private getStudentData() {
    this.professorGradesSubscription = this.professorService.getProfessorGrades(this.subjectSelected.id)
    .subscribe((response: any) => {
      this.studentList = response;
      this.studentSelected = (response && response.length) ? response[0] : null;

      if (this.studentSelected) {
        this.patchGrades();
      }

    });
  }

  private initForm() {
    this.form = this.fb.group({
      id: [''],
      studentId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      subjectId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      professorId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      gradeExam: ['', [Validators.min(0), Validators.max(10), Validators.pattern('^[0-9]*$')]],
      gradeFinal: ['', [Validators.min(0), Validators.max(10), Validators.pattern('^[0-9]*$')]],
      gradeLaboratory: ['', [Validators.min(0), Validators.max(10), Validators.pattern('^[0-9]*$')]],
      gradeProject: ['', [Validators.min(0), Validators.max(10), Validators.pattern('^[0-9]*$')]]
    });
  }

  private patchGrades() {
    this.form.patchValue({
      studentId: this.studentSelected.id,
      gradeExam: this.studentSelected.gradeExam ? this.studentSelected.gradeExam : null,
      gradeFinal: this.studentSelected.gradeFinal ? this.studentSelected.gradeFinal : null,
      gradeLaboratory: this.studentSelected.gradeLaboratory ? this.studentSelected.gradeLaboratory : null,
      gradeProject: this.studentSelected.gradeProject ? this.studentSelected.gradeProject : null
    });
  }

}
