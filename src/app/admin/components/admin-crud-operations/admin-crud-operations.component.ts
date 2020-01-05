import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mode } from 'src/app/core/models/mode.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminView, AdminRoute } from 'src/app/core/models/admin.enum';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/core/models/role.enum';

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
  public Year = YearOfStudy;
  private professorSubscription: Subscription;
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
    private readonly adminService: AdminService) {

    this.subjectList = [];
    this.professorSubscription = new Subscription();
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
    if (this.subjectSubscription) {
      this.subjectSubscription.unsubscribe();
    }
  }

  public onSubmit() {
    console.log(this.professorForm.getRawValue());
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

    });
  }

  private getSubjectList() {
    this.subjectSubscription = this.adminService.getAllSubjectsList()
      .subscribe((response: any) => {
        console.log('subject list:', response);
        this.subjectList = response;
      });
  }

  private initProfessorForm() {
    this.professorForm = this.fb.group({
      id: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
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
      password: [null, [Validators.required]],
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
    this.professorSubscription = this.adminService.submitProfessorData(requestBody)
      .subscribe((response: any) => {

      });
  }

  private submitStudentData() {
    const requestBody = this.studentForm.getRawValue();
  }

  private submitSubjectData() {
    const requestBody = this.subjectForm.getRawValue();
    if (requestBody && requestBody.acronym) {
      requestBody.acronym = requestBody.acronym.toLocaleUpperCase();
    }
  }

}
