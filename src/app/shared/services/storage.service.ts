import { ReplaySubject } from "rxjs/ReplaySubject";

export class StorageService {

    cartCount = new ReplaySubject<number>(1);

    constructor() {
        if(this.cart) {
            this.getProductsCount(JSON.parse(this.cart));
        }
    }

    get cart() {
        return localStorage.getItem("cart");
    }


    saveDataToLocalStorage(id: number, price: number)
    {
        if(this.cart) {
            const cart = JSON.parse(this.cart);
            this.setProductId(id, price, cart);
        } else {
            this.setProductId(id, price);
        }
    }

    setProductId(id: number, price: number, products = []) {
        const currentProduct = products.find(p => p.id === id);
        if(currentProduct) {
            const currentProductIndex = products.findIndex(p => p.id === id);
            products[currentProductIndex].count += 1;
        } else {
            products.push({id, price, count: 1});
        }
        this.getProductsCount(products);
        localStorage.setItem("cart", JSON.stringify(products));
    }

    getProductsCount(products = []) {
        const count = products.reduce((prev, next) => {
            return prev + next.count;
        }, 0);

        this.cartCount.next(count);
    }

}