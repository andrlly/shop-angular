import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { ApiService } from "./api.service";

@Injectable()
export class UsersService {
    constructor(
        public http: Http,
        private apiService: ApiService) {}

    createNewUser(user: User): Observable<User> {
        return this.apiService.post('users', user);
    }

}
