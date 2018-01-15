import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Home } from "./home.model";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "../../shared/services/api.service";

@Injectable()
export class HomeService {
    constructor(
        private apiService: ApiService,
    ) { }

    getConfigs(): Observable<Home> {
        return this.apiService.get('configs')
            .map((home: Home) => home);
    }
}