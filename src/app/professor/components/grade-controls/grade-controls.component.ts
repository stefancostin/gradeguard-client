import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mode } from 'src/app/core/models/mode.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import { Subscription } from 'rxjs';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'grd-grade-controls',
  templateUrl: './grade-controls.component.html',
  styleUrls: ['./grade-controls.component.scss']
})
export class GradeControlsComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public mode: any;
  public Mode = Mode;
  public studentList: Array<any>;
  public studentSelected: any;
  public subjectList: Array<any>;
  public subjectSelected: any;
  private professorId: number;
  private professorDataSubscription: Subscription;
  private professorGradesSubscription: Subscription;
  private professorSubmitSubscription: Subscription;

  constructor(private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly professorService: ProfessorService,
    private readonly alertService: AlertService) {

    this.professorDataSubscription = new Subscription();
    this.professorGradesSubscription = new Subscription();
    this.professorSubmitSubscription = new Subscription();

    // HARDCODED
    this.professorId = 4;
  }

  ngOnInit() {
    this.getRouteParams();
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
    if (this.professorSubmitSubscription) {
      this.professorSubmitSubscription.unsubscribe();
    }
  }

  changeStudent() {
    this.form.patchValue({ studentId: this.studentSelected.id });
  }

  changeSubject() {
    this.getStudentList();
    this.form.patchValue({ subjectId: this.subjectSelected.id });
  }

  isDisabled() {
    return this.form.invalid;
  }

  onSubmit() {
    const gradesRequest = this.form.getRawValue();
    this.professorSubmitSubscription = this.professorService.submitGrades(gradesRequest)
      .subscribe((response: any) => {
        this.alertService.success('Grades have been updated successfully.');
      }, (error) => {
        this.alertService.danger(error.message);
      });
  }

  private getProfessorData() {
    this.professorDataSubscription = this.professorService.getProfessorData(this.professorId)
      .subscribe((response: any) => {
        this.subjectList = response;
        this.subjectSelected = (response && response.length) ? response[0] : null;

        if (this.subjectSelected) {
          this.form.patchValue({ subjectId: this.subjectSelected.id });
        }

        this.getStudentList();
      }, (error) => {
        this.alertService.danger(error.message);
      });
  }

  private getStudentList() {
    this.professorGradesSubscription = this.professorService.getProfessorGrades(this.subjectSelected.id)
      .subscribe((response: any) => {
        this.studentList = response;
        this.studentSelected = (response && response.length) ? response[0] : null;

        if (this.studentSelected) {
          this.patchGrades();
        }

      }, (error) => {
        this.alertService.danger(error.message);
      });
  }

  private getRouteParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      const { mode } = params;

      if (mode) {
        this.mode = (mode === Mode.ADD) ? mode :
          (mode === Mode.EDIT) ? mode : null;
      }

    });
  }

  private initForm() {
    this.form = this.fb.group({
      studentId: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      subjectId: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      professorId: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      gradeExam: [null, [Validators.min(0), Validators.max(10), Validators.pattern('^[0-9]*$')]],
      gradeFinal: [null, [Validators.min(0), Validators.max(10), Validators.pattern('^[0-9]*$')]],
      gradeLaboratory: [null, [Validators.min(0), Validators.max(10), Validators.pattern('^[0-9]*$')]],
      gradeProject: [null, [Validators.min(0), Validators.max(10), Validators.pattern('^[0-9]*$')]]
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
