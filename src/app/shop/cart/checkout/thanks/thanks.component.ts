import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit, OnDestroy {

  info = [];
  order_date;

  constructor() {
    this.order_date = new Date();
  }

  ngOnInit() {
       JSON.parse(localStorage.getItem("checkout")).map(info => {
         this.info.push(info);
       });

      localStorage.removeItem('cart');
      localStorage.removeItem('checkout');
  }

    get total() {
        return this.info.reduce((prev, next) => {
            return prev + (next.count * next.price);
        }, 0);
    }

    ngOnDestroy() {

    }

}
