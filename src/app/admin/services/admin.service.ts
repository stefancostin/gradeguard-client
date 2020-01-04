import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly httpClient: HttpClient) { }

  public getProfessorsList() {
    const url = `${BASE_URL}/users/admin/professors`;
    return this.httpClient.get(url);
  }

}
