import { Injectable } from '@angular/core';
import { Semester } from '../models/semester.enum';

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

}
