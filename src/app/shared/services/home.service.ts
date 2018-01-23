import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { ApiService } from "./api.service";
import { Home } from "../models/home.model";

@Injectable()
export class HomeService {
    constructor(private api: ApiService,) {
    }

    getConfigs(): Observable<Home> {
        return this.api.get('configs');
    }

    updateConfigs(body) {
        return this.api.post(`configs/edit`, body);
    }

}