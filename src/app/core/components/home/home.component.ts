import { Component, OnInit } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role.enum';

@Component({
  selector: 'grd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly router: Router,
    private readonly contextService: ContextService) { }

  ngOnInit() {
    this.redirect();
  }

  private redirect(): void {
    const role = this.contextService.getUserRole();
    switch (role) {
      case Role.ADMIN:
        this.router.navigateByUrl('/admin');
        break;
      case Role.PROFESSOR:
        this.router.navigateByUrl('/profesor');
        break;
      case Role.STUDENT:
        this.router.navigateByUrl('/student');
        break;
      default:
        this.router.navigateByUrl('/login');
    }
  }

}
