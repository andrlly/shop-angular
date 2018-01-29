import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";

import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    authType: string;
    title: string;
    authForm: FormGroup;

    constructor(private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private ngFlashMessageService: NgFlashMessageService) {
    }

    ngOnInit() {
        this.authForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
        this.route.url.subscribe(data => {
            this.authType = data[0].path;
            this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
            if (this.authType === 'registration') {
                this.authForm.addControl('name', new FormControl('', Validators.required));
                this.authForm.addControl('password_confirmation', new FormControl('', Validators.required));
            }
        });
    }

    submitForm() {
        const credentials = this.authForm.value;
        this.authService.attemptAuth(this.authType, credentials)
            .subscribe(user => {
                if (user) {
                    this.router.navigate(['/admin']);
                } else {
                    this.ngFlashMessageService.showFlashMessage({
                        messages: ["Wrong username or password."],
                        dismissible: true,
                        timeout: 3000,
                        type: 'danger'
                    });
                }
            });
    }

}
