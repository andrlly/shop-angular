import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { OrderUser } from "../models/order-user.model";


@Injectable()
export class OrderUsersService {

    constructor(private api: ApiService) {
    }

    addOrderUser(body): Observable<OrderUser> {
        return this.api.post('orderuser/add', body)
            .map(data => data);
    }

}