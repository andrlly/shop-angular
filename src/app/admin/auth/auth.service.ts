import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ApiService } from "../../shared/services/api.service";
import { User } from "../../shared/models/user.model";

@Injectable()
export class AuthService {

    constructor(private apiService: ApiService) {
    }

    // private isAuthenticated = false;

    // login(user) {
    //     this.isAuthenticated = true;
    //     window.localStorage.setItem('user', JSON.stringify(user));
    // }

    logout() {
        // this.isAuthenticated = false;
        window.localStorage.clear();
    }

    isLoggedIn() {
        // return this.isAuthenticated;
        return localStorage.getItem('user');
    }

    // find user by email
    attemptAuth(type, credentials): Observable<User> {
        const route = type === 'login' ? '/auth' : '/registration';
        return this.apiService.post('user' + route, credentials)
            .map(user => {
                localStorage.setItem('user', JSON.stringify(user.user_id));
                return user.user_id;
            });
    }

    getUserById(id) {
        return this.apiService.get(`user/${id}`);
    }

}