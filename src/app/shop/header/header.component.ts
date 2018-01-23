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

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authService: AuthService,
                private storageService: StorageService) {
    }

    logButton: boolean = false;
    productsCount: number;

    ngOnInit() {
        this.route.queryParams
            .subscribe((params: Params) => {
                if (params['accessDenied']) {
                    this.logButton = true;
                } else {
                    this.logButton = false;
                }
            });

        this.storageService.cartCount.subscribe(count => {
            this.productsCount = count;
        })
    }

    onLogout() {
        this.authService.logout();
        this.logButton = false;
        this.router.navigate(['']);
    }

}
