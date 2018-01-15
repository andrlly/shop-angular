import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

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
            this.logButton = false;
          } else {
            this.logButton = true;
          }
        })
  }

  onLogout() {
    this.authService.logout();
    // this.logButton = true;
    this.router.navigate(['']);
  }

}
