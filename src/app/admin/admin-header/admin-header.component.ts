import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['']);
    }

}