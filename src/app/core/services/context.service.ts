import { Injectable } from '@angular/core';
import { Semester } from '../models/semester.enum';
import { Role } from '../models/role.enum';

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

  public isAuthenticated(role: Role): boolean {
    const storage = window.localStorage.getItem('gradeGuardUser');
    if (storage) {
      const gradeGuardUser = JSON.parse(storage);
      return gradeGuardUser.role === role;
    }
    return false;
  }

  public storeAuthentication(authData: any) {
    const gradeGuardUser = {
      id: authData.id,
      name: authData.name,
      role: authData.role
    };

    window.localStorage.set('gradeGuardUser', JSON.stringify(gradeGuardUser));
  }

}
