import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { YearOfStudy } from 'src/app/core/models/year-of-study.enum';
import { Semester } from 'src/app/core/models/semester.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly httpClient: HttpClient) { }

  public getProfessorsList() {
    const url = `${BASE_URL}/users/admin/professors`;
    return this.httpClient.get(url);
  }

  public getStudentsList(yearOfStudy: YearOfStudy) {
    const url = `${BASE_URL}/users/admin/students/${yearOfStudy}`;
    return this.httpClient.get(url);
  }

  public getSubjectsList(yearOfStudy: YearOfStudy, semester: Semester) {
    const url = `${BASE_URL}/subjects/admin/${yearOfStudy}/${semester}`;
    return this.httpClient.get(url);
  }

  public getAllSubjectsList() {
    const url = `${BASE_URL}/subjects`;
    return this.httpClient.get(url);
  }

  public getProfessorData(professorId: number) {
    const url = `${BASE_URL}/users/${professorId}`;
    return this.httpClient.get(url);
  }

  public getStudentData(studentId: number) {
    const url = `${BASE_URL}/users/${studentId}`;
    return this.httpClient.get(url);
  }

  public getSubjectData(subjectId: number) {
    const url = `${BASE_URL}/subjects/${subjectId}`;
    return this.httpClient.get(url);
  }

  public submitProfessorData(requestBody: any) {
    const url = `${BASE_URL}/users/admin/professors`;
    return this.httpClient.post(url, requestBody);
  }

  public submitStudentData(requestBody: any) {
    const url = `${BASE_URL}/users`;
    return this.httpClient.post(url, requestBody);
  }

  public submitSubjectData(requestBody: any) {
    const url = `${BASE_URL}/subjects`;
    return this.httpClient.post(url, requestBody);
  }

  public updateProfessorData(requestBody: any) {
    const url = `${BASE_URL}/users/admin/professors/${requestBody.id}`;
    return this.httpClient.put(url, requestBody);
  }

  public updateStudentData(requestBody: any) {
    const url = `${BASE_URL}/users/${requestBody.id}`;
    return this.httpClient.put(url, requestBody);
  }

  public updateSubjectData(requestBody: any) {
    const url = `${BASE_URL}/subjects/${requestBody.id}`;
    return this.httpClient.put(url, requestBody);
  }

  public removeUser(userId: number) {
    const url = `${BASE_URL}/users/${userId}`;
    return this.httpClient.delete(url);
  }

  public removeSubject(subjectId: number) {
    const url = `${BASE_URL}/subjects/${subjectId}`;
    return this.httpClient.delete(url);
  }

}
