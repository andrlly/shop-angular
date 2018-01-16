import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "../../admin/auth/auth.service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
  ) { }

  logButton: boolean = false;

  ngOnInit() {
    this.route.queryParams
        .subscribe((params: Params) => {
          if (params['accessDenied']) {
            this.logButton = true;
          } else {
            this.logButton = false;
          }
        })
  }

  onLogout() {
    this.authService.logout();
    this.logButton = false;
    this.router.navigate(['']);
  }

}
