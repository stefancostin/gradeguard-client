import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'grd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    const authRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(authRequest).subscribe((response: any) => {
      console.log(response);
    });
  }

}
