import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mode } from 'src/app/core/models/mode.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import { Subscription } from 'rxjs';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ContextService } from 'src/app/core/services/context.service';
import { filter, map } from 'rxjs/operators';

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
  private professorStudentsSubscription: Subscription;
  private professorSubmitSubscription: Subscription;

  constructor(private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly contextService: ContextService,
    private readonly professorService: ProfessorService,
    private readonly alertService: AlertService) {

    this.professorDataSubscription = new Subscription();
    this.professorGradesSubscription = new Subscription();
    this.professorSubmitSubscription = new Subscription();
    this.professorStudentsSubscription = new Subscription();
    this.professorId = this.contextService.getUserId();
  }

  ngOnInit() {
    this.getRouteParams();
    this.initForm();
    this.getProfessorData();
    this.form.patchValue({ professorId: this.professorId });
  }

  ngOnDestroy() {
    if (this.professorDataSubscription) {
      this.professorDataSubscription.unsubscribe();
    }
    if (this.professorGradesSubscription) {
      this.professorGradesSubscription.unsubscribe();
    }
    if (this.professorStudentsSubscription) {
      this.professorStudentsSubscription.unsubscribe();
    }
    if (this.professorSubmitSubscription) {
      this.professorSubmitSubscription.unsubscribe();
    }
  }

  changeStudent() {
    this.getStudentGrades();
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

  private getStudentGrades() {
    this.professorGradesSubscription = this.professorService.getProfessorGrades(this.subjectSelected.id)
      .pipe(
        map((response: any) => {
          // filter only the grades of the selected student
          return response.filter((student: any) => student.id === this.studentSelected.id);
        })
      )
      .subscribe((response: any) => {
        const student = response ? response[0] : null;

        if (student) {
          this.patchGrades(student);
        } else {
          this.clearGrades();
        }

      }, (error) => {
        this.alertService.danger(error.message);
      });
  }

  private getStudentList() {
    this.professorStudentsSubscription = this.professorService.getStudentsOfSubject(this.subjectSelected.id)
      .subscribe((response: any) => {
        this.studentList = response;
        this.studentSelected = (response && response.length) ? response[0] : null;

        if (this.studentSelected) {
          this.form.patchValue({ studentId: this.studentSelected.id });
          this.getStudentGrades();
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

  private clearGrades() {
    this.form.patchValue({
      gradeExam: null,
      gradeFinal: null,
      gradeLaboratory: null,
      gradeProject: null
    });
  }

  private initForm() {
    this.form = this.fb.group({
      studentId: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      subjectId: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      professorId: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      gradeExam: [null, [Validators.min(1), Validators.max(10), Validators.pattern('^[0-9]*$')]],
      gradeFinal: [null, [Validators.min(1), Validators.max(10), Validators.pattern('^[0-9]*$')]],
      gradeLaboratory: [null, [Validators.min(1), Validators.max(10), Validators.pattern('^[0-9]*$')]],
      gradeProject: [null, [Validators.min(1), Validators.max(10), Validators.pattern('^[0-9]*$')]]
    });
  }

  private patchGrades(student: any) {
    this.form.patchValue({
      studentId: student.id,
      gradeExam: student.gradeExam ? student.gradeExam : null,
      gradeFinal: student.gradeFinal ? student.gradeFinal : null,
      gradeLaboratory: student.gradeLaboratory ? student.gradeLaboratory : null,
      gradeProject: student.gradeProject ? student.gradeProject : null
    });
  }

}
