import { Injectable } from '@angular/core';
import { Semester } from '../models/semester.enum';
import { Role } from '../models/role.enum';
import { Auth } from '../models/auth.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(private readonly router: Router) { }

  public getSemester(): Semester {
    const currentDate = new Date();
    const startOfSemesterI = new Date(currentDate.getFullYear(), 9, 1);
    const startOfSemesterII = new Date(currentDate.getFullYear(), 1, 17);

    if (currentDate > startOfSemesterII && currentDate < startOfSemesterI) {
      return Semester.II;
    }

    return Semester.I;
  }

  public getUserId(): number {
    return parseInt(this.getCookie(Auth.ID), 10);
  }

  public getUserName(): string {
    return this.getCookie(Auth.NAME);
  }

  public getUserRole(): string {
    return this.getCookie(Auth.ROLE);
  }

  public hasLoggedIn(): boolean {
    return !!(this.getUserId() && this.getUserRole());
  }

  public removeAuthentication(): void {
    document.cookie = `${Auth.ID}=;`;
    document.cookie = `${Auth.NAME}=;`;
    document.cookie = `${Auth.ROLE}=;`;
  }

  public storeAuthentication(authData: any): void {
    document.cookie = `${Auth.ID}=${authData.id};`;
    document.cookie = `${Auth.NAME}=${authData.name};`;
    document.cookie = `${Auth.ROLE}=${authData.role};`;
  }

  public redirect(): void {
    const role = this.getUserRole();
    switch (role) {
      case Role.ADMIN:
        this.router.navigateByUrl('/admin/materii');
        break;
      case Role.PROFESSOR:
        this.router.navigateByUrl('/profesor');
        break;
      case Role.STUDENT:
        this.router.navigateByUrl('/student');
        break;
      default:
        this.router.navigateByUrl('/login');
    }
  }

  private getCookie(property: string): string {
    let result = '';
    const cookies = decodeURIComponent(document.cookie).split(';');
    cookies.forEach(cookie => {
      cookie = cookie.trim();
      if (cookie.indexOf(property) === 0) {
        result = cookie.substring(property.length + 1, cookie.length);
      }
    });
    return result;
  }

}
