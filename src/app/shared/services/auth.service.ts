import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { User } from "../models/user.model";
import { ApiService } from "./api.service";

@Injectable()
export class AuthService {

    constructor(
        private apiService: ApiService
    ) { }

    private isAuthenticated = false;

    login() {
        this.isAuthenticated = true;
    }

    logout() {
        this.isAuthenticated = false;
        window.localStorage.clear();
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }

    // find user by email
    attemptAuth(type, credentials): Observable<User> {
        console.log(credentials);
        const route = type === 'login' ? '/auth' : '/registration';
        return this.apiService.post('user' + route, credentials)
            .map(user => {
                return user.user_id;
            });
    }

}