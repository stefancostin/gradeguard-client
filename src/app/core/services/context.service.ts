import { Injectable } from '@angular/core';
import { Semester } from '../models/semester.enum';
import { Role } from '../models/role.enum';
import { Auth } from '../models/auth.enum';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor() { }

  public getSemester(): Semester {
    const currentDate = new Date();
    const startOfSemesterI = new Date(currentDate.getFullYear(), 9, 1);
    const startOfSemesterII = new Date(currentDate.getFullYear() , 1, 17);

    if (currentDate > startOfSemesterII && currentDate < startOfSemesterI) {
      return Semester.II;
    }

    return Semester.I;
  }

  public getUserId(): string {
    return this.getCookie(Auth.ID);
  }

  public getUserName(): string {
    return this.getCookie(Auth.NAME);
  }

  public getUserRole(): string {
    return this.getCookie(Auth.ROLE);
  }

  public isAuthenticated(role: Role): boolean {
    return role === this.getUserRole();
  }

  public storeAuthentication(authData: any): void {
    const idCookie = `${Auth.ID}=${authData.id}`;
    const nameCookie = `${Auth.NAME}=${authData.name}`;
    const roleCookie = `${Auth.ROLE}=${authData.role}`;

    document.cookie = `${idCookie} ${nameCookie} ${roleCookie}`;
  }

  public isAuthenticatedLocalStorage(role: Role): boolean {
    const storage = window.localStorage.getItem('gradeGuardUser');
    if (storage) {
      const gradeGuardUser = JSON.parse(storage);
      return gradeGuardUser.role === role;
    }
    return false;
  }

  public storeAuthenticationLocalStorage(authData: any) {
    const gradeGuardUser = {
      id: authData.id,
      name: authData.name,
      role: authData.role
    };

    window.localStorage.set('gradeGuardUser', JSON.stringify(gradeGuardUser));
  }

  private getCookie(property: string): string {
    const cookies = decodeURIComponent(document.cookie).split(';');
    cookies.forEach(cookie => {
      cookie.trim();
      if (cookie.indexOf(property) === 0) {
        return cookie.substring(property.length + 1, cookie.length);
      }
    });
    return '';
  }

}
