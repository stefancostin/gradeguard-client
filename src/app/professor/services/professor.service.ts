import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/environments/environment';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private readonly httpClient: HttpClient) { }

  public getProfessorData(professorId: number) {
    const url = `${BASE_URL}/users/professors/${professorId}/subjects`;
    return this.httpClient.get(url);
  }

  public getProfessorGrades(subjectId: number) {
    const url = `${BASE_URL}/users/professors/subjects/${subjectId}/grades`;
    return this.httpClient.get(url);
  }

  public getStudentsOfSubject(subjectId: number) {
    const url = `${BASE_URL}/users/professors/subjects/${subjectId}/students`;
    return this.httpClient.get(url);
  }

  public submitGrades(gradesRequest: any) {
    const url = `${BASE_URL}/grades/submit`;
    return this.httpClient.post(url, gradesRequest);
  }

}
