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

  public professorForm: FormGroup;
  public studentForm: FormGroup;
  public subjectForm: FormGroup;
  public view: AdminView;
  public AdminView = AdminView;
  public Mode = Mode;
  public Role = Role;
  public Year = YearOfStudy;
  private professorSubscription: Subscription;

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

  subjectList = [
    { id: 1, title: 'SCC' },
    { id: 2, title: 'LTW' },
    { id: 3, title: 'CC' },
    { id: 4, title: 'FPD' },
    { id: 5, title: 'MSR' },
  ];

  constructor(private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly adminService: AdminService) {

    this.professorSubscription = new Subscription();
  }

  ngOnInit() {
    const currentPage: string = this.setCurrentPageFromUrl();
    this.setCurrentPageView(currentPage);
  }

  ngOnDestroy() {
    if (this.professorSubscription) {
      this.professorSubscription.unsubscribe();
    }
  }

  isYearDisabled(year: YearOfStudy): boolean {
    return year === YearOfStudy.III;
  }

  private initProfessorForm() {
    this.professorForm = this.fb.group({
      id: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      role: [Role.PROFESSOR],
      subjectsIdList: [null]
    });
  }

  private initStudentForm() {
    this.studentForm = this.fb.group({
      id: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      role: [Role.STUDENT],
      yearOfStudy: [null, [Validators.required]]
    });
  }

  private setCurrentPageFromUrl(): string {
    return this.router.url.split('/').pop().split('?').slice(0, 1).join();
  }

  private setCurrentPageView(currentPage: string) {
    switch (currentPage) {
      case AdminRoute[AdminView.PROFESSOR]:
        this.view = AdminView.PROFESSOR;
        break;
      case AdminRoute[AdminView.STUDENT]:
        this.view = AdminView.STUDENT;
        break;
      case AdminRoute[AdminView.SUBJECT]:
        this.view = AdminView.SUBJECT;
        break;
      default:
        this.view = null;
    }
  }

}
