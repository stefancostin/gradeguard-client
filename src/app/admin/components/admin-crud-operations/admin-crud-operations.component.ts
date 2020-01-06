import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mode } from 'src/app/core/models/mode.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminView, AdminRoute } from 'src/app/core/models/admin.enum';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/core/models/role.enum';
import { Semester } from 'src/app/core/models/semester.enum';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'grd-admin-crud-operations',
  templateUrl: './admin-crud-operations.component.html',
  styleUrls: ['./admin-crud-operations.component.scss']
})
export class AdminCrudOperationsComponent implements OnInit, OnDestroy {

  public actionMode: string;
  public professorForm: FormGroup;
  public studentForm: FormGroup;
  public subjectForm: FormGroup;
  public subjectList: Array<any>;
  public view: AdminView;
  public AdminView = AdminView;
  public Mode = Mode;
  public Role = Role;
  public Semester = Semester;
  public Year = YearOfStudy;
  private professorSubscription: Subscription;
  private studentSubscription: Subscription;
  private subjectSubscription: Subscription;

  professorList = [
    { id: 1, name: 'Stefan Costin' },
    { id: 2, name: 'Andreea Saratian' },
    { id: 3, name: 'Andrei Popa' },
    { id: 4, name: 'Karina Matrana' },
    { id: 5, name: 'Dragos Popa' },
    { id: 6, name: 'David Popa' },
    { id: 7, name: 'Andra Botezatu' },
  ];

  studentList = [
    { id: 1, name: 'Stefan Costin' },
    { id: 2, name: 'Andreea Saratian' },
    { id: 3, name: 'Andrei Popa' },
    { id: 4, name: 'Karina Matrana' },
    { id: 5, name: 'Dragos Popa' },
    { id: 6, name: 'David Popa' },
    { id: 7, name: 'Andra Botezatu' },
  ];

  constructor(private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly adminService: AdminService,
    private readonly alertService: AlertService) {

    this.subjectList = [];
    this.professorSubscription = new Subscription();
    this.studentSubscription = new Subscription();
    this.subjectSubscription = new Subscription();
  }

  ngOnInit() {
    const currentPage: string = this.setCurrentPageFromUrl();
    this.setCurrentPageView(currentPage);
    this.getRouteParams();
  }

  ngOnDestroy() {
    if (this.professorSubscription) {
      this.professorSubscription.unsubscribe();
    }
    if (this.studentSubscription) {
      this.studentSubscription.unsubscribe();
    }
    if (this.subjectSubscription) {
      this.subjectSubscription.unsubscribe();
    }
  }

  public isSubmitDisabled(): boolean {
    switch (this.view) {
      case AdminView.PROFESSOR:
        return this.professorForm.invalid;
      case AdminView.STUDENT:
        return this.studentForm.invalid;
      case AdminView.SUBJECT:
        return this.subjectForm.invalid;
      default: return true;
    }
  }

  public onSubmit() {
    switch (this.view) {
      case AdminView.PROFESSOR:
        this.submitProfessorData();
        break;
      case AdminView.STUDENT:
        this.submitStudentData();
        break;
      case AdminView.SUBJECT:
        this.submitSubjectData();
        break;
      default: break;
    }
  }

  private getRouteParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      const { mode, professorId, studentId, subjectId } = params;

      if (mode) {
        this.actionMode = (mode === Mode.ADD) ? mode :
          (mode === Mode.EDIT) ? mode : null;
      }

      if (professorId && this.view === AdminView.PROFESSOR) {
        this.getProfessorData(professorId);
      }

      if (studentId && this.view === AdminView.STUDENT) {
        this.getStudentData(studentId);
      }

      if (subjectId && this.view === AdminView.SUBJECT) {
        this.getSubjectData(subjectId);
      }

    });
  }

  private getProfessorData(professorId: number) {
    this.professorSubscription = this.adminService.getProfessorData(professorId)
      .subscribe((response: any) => {
        this.mapProfessorFormOnUpdate(response);
      });
  }

  private getStudentData(studentId: number) {
    this.studentSubscription = this.adminService.getStudentData(studentId)
      .subscribe((response: any) => {
        this.mapStudentFormOnUpdate(response);
      });
  }

  private getSubjectData(subjectId: number) {
    this.subjectSubscription = this.adminService.getSubjectData(subjectId)
      .subscribe((response: any) => {
        this.mapSubjectFormOnUpdate(response);
      });
  }

  private getSubjectList() {
    this.subjectSubscription = this.adminService.getAllSubjectsList()
      .subscribe((response: any) => {
        this.subjectList = response;
      });
  }

  private initProfessorForm() {
    this.professorForm = this.fb.group({
      id: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null],
      role: [Role.PROFESSOR],
      subjectsIdList: [[]]
    });
  }

  private initStudentForm() {
    this.studentForm = this.fb.group({
      id: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null],
      role: [Role.STUDENT],
      yearOfStudy: [null, [Validators.required]]
    });
  }

  private initSubjectForm() {
    this.subjectForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      acronym: [null, [Validators.required]],
      yearOfStudy: [null, [Validators.required]],
      semester: [null, [Validators.required]]
    });
  }

  private mapProfessorFormOnUpdate(response: any) {
    if (response) {
      this.professorForm.setValue({
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        password: response.password,
        role: response.role,
        subjectsIdList: this.mapSubjectsTaughtToIdList(response.subjectsTaught)
      });
    }
  }

  private mapStudentFormOnUpdate(response: any) {
    if (response) {
      this.studentForm.setValue({
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        password: response.password,
        role: response.role,
        yearOfStudy: response.yearOfStudy
      });
    }
  }

  private mapSubjectFormOnUpdate(response: any) {
    if (response) {
      this.subjectForm.setValue({
        id: response.id,
        name: response.name,
        acronym: response.acronym,
        yearOfStudy: response.yearOfStudy,
        semester: response.semester
      });
    }
  }

  private mapSubjectsTaughtToIdList(subjectsTaught: Array<any>): Array<number> {
    const subjectsIdList = [];
    if (subjectsTaught) {
      subjectsTaught.forEach(subject => {
        subjectsIdList.push(subject.id);
      });
    }
    return subjectsIdList;
  }

  private setCurrentPageFromUrl(): string {
    return this.router.url.split('/').pop().split('?').slice(0, 1).join();
  }

  private setCurrentPageView(currentPage: string) {
    switch (currentPage) {
      case AdminRoute[AdminView.PROFESSOR]:
        this.view = AdminView.PROFESSOR;
        this.initProfessorForm();
        this.getSubjectList();
        break;
      case AdminRoute[AdminView.STUDENT]:
        this.view = AdminView.STUDENT;
        this.initStudentForm();
        break;
      case AdminRoute[AdminView.SUBJECT]:
        this.view = AdminView.SUBJECT;
        this.initSubjectForm();
        break;
      default:
        this.view = null;
        break;
    }
  }

  private submitProfessorData() {
    const requestBody = this.professorForm.getRawValue();

    if (this.actionMode === Mode.EDIT) {
      // EDIT PROFESSOR
      this.professorSubscription = this.adminService.updateProfessorData(requestBody)
        .subscribe((response: any) => {
          this.alertService.success('Professor has been updated successfully.');
        }, (error) => {
          this.alertService.danger(error.message);
        });

    } else {
      // ADD PROFESSOR
      this.professorSubscription = this.adminService.submitProfessorData(requestBody)
        .subscribe((response: any) => {
          this.alertService.success('Professor has been added successfully.');
          this.professorForm.reset();
        }, (error) => {
          this.alertService.danger(error.message);
        });

    }
  }

  private submitStudentData() {
    const requestBody = this.studentForm.getRawValue();

    if (this.actionMode === Mode.EDIT) {
      // EDIT STUDENT
      this.studentSubscription = this.adminService.updateStudentData(requestBody)
        .subscribe((response: any) => {
          this.alertService.success('Student has been updated successfully.');
        }, (error) => {
          this.alertService.danger(error.message);
        });

    } else {
      // ADD STUDENT
      this.studentSubscription = this.adminService.submitStudentData(requestBody)
        .subscribe((response: any) => {
          this.alertService.success('Student has been added successfully.');
          this.studentForm.reset();
        }, (error) => {
          this.alertService.danger(error.message);
        });

    }
  }

  private submitSubjectData() {
    const requestBody = this.subjectForm.getRawValue();
    if (requestBody && requestBody.acronym) {
      requestBody.acronym = requestBody.acronym.toLocaleUpperCase();
    }


    if (this.actionMode === Mode.EDIT) {
      // EDIT SUBJECT
      this.subjectSubscription = this.adminService.updateSubjectData(requestBody)
        .subscribe((response: any) => {
          this.alertService.success('Subject has been updated successfully.');
        }, (error) => {
          this.alertService.danger(error.message);
        });

    } else {
      // ADD SUBJECT
      this.subjectSubscription = this.adminService.submitSubjectData(requestBody)
        .subscribe((response: any) => {
          this.alertService.success('Subject has been added successfully.');
          this.subjectForm.reset();
        }, (error) => {
          this.alertService.danger(error.message);
        });

    }
  }

}
