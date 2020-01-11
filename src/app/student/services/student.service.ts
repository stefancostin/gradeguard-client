import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from 'src/environments/environment';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';
import { Semester } from 'src/app/core/models/semester.enum';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private readonly httpClient: HttpClient) { }

  public getStudentData(studentId: number) {
    const url = `${BASE_URL}/users/students/${studentId}`;
    return this.httpClient.get(url);
  }

  public getStudentGrades(studentId: number, year: YearOfStudy, semester: Semester) {
    const url = `${BASE_URL}/users/students/${studentId}/grades`;
    const params = new HttpParams().append('year', year).append('semester', semester);
    return this.httpClient.get(url, { params: params });
  }

}
