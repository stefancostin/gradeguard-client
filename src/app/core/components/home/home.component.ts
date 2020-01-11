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

  constructor(private readonly contextService: ContextService) { }

  ngOnInit() {
    this.contextService.redirect();
  }

}
