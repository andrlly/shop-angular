import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "../../admin/auth/auth.service";
import { StorageService } from "../../shared/services/storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLoggedIn = this.authService.isLoggedIn();
    productsCount: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authService: AuthService,
                private storageService: StorageService) {
    }

    ngOnInit() {

        this.storageService.cartCount.subscribe(count => {
            this.productsCount = count;
        })
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['']);
    }

}
