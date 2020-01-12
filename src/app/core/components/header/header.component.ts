import { Component, OnInit } from '@angular/core';
import { AdminRoute, AdminView } from '../../models/admin.enum';
import { ContextService } from '../../services/context.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role.enum';

@Component({
  selector: 'grd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  AdminRoute = AdminRoute;
  AdminView = AdminView;
  Role = Role;
  userName: string;
  userRole: string;

  constructor(private readonly router: Router,
    private readonly contextService: ContextService) { }

  ngOnInit() {
    this.userName = this.contextService.getUserName();
    this.userRole = this.contextService.getUserRole();
  }

  logout() {
    this.contextService.removeAuthentication();
    this.router.navigateByUrl('/login');
  }

}
