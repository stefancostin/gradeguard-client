import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) { }

  public login(authRequest: any) {
    const url = `${BASE_URL}/auth`;
    return this.httpClient.post(url, authRequest);
  }

}
