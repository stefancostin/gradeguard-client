import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from 'ngx-alerts';
import { ContextService } from '../../services/context.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'grd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private loginSubscription: Subscription;

  constructor(private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly contextService: ContextService,
    private readonly alertService: AlertService) {

    this.redirectIfUserLoggedIn();
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  isLoginDisabled(): boolean {
    return this.loginForm.invalid;
  }

  login(): void {
    const authRequest = this.loginForm.getRawValue();

    this.loginSubscription =  this.authService.login(authRequest)
      .subscribe((response: any) => {
        if (response.isAuthenticated && response.authenticatedUser) {
          this.contextService.storeAuthentication(response.authenticatedUser);
          this.contextService.redirect();

        } else {
          this.alertService.warning('Incorrect email or password.');
        }

      }, (error) => {
        this.alertService.danger(error.message);
      });
  }

  private initForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  private redirectIfUserLoggedIn(): void {
    const isLoggedIn: boolean = this.contextService.hasLoggedIn();

    if (isLoggedIn) {
      this.contextService.redirect();
    }
  }

}
