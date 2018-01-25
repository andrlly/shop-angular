import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { ProductsService } from '../../shared/services/products.service';

@Injectable()
export class CartResolver implements Resolve<any> {
    products = [];
    ids = [];

    constructor(private router: Router,
                private productsService: ProductsService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {
        this.products = JSON.parse(localStorage.getItem('cart')) || [];
        this.ids = this.products.map(p => p.id);
        return this.productsService.getProductByIds(this.ids.join(','))
            .pipe(catchError((err) => this.router.navigateByUrl('/')));
    }
}