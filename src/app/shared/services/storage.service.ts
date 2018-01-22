export class StorageService {

    constructor() {
    }

    saveDataToLocalStorage(id: number, price: number)
    {
        if(localStorage.getItem("cart")) {
            const cart = JSON.parse(localStorage.getItem("cart"));
            this.plusCount(id, cart);
            this.setProductId(id, price, cart);
        } else {
            this.setProductId(id, price);
        }
    }

    setProductId(id: number, price: number, products = []) {
        products.push({id: id, price: price, count: 1});
        localStorage.setItem("cart", JSON.stringify(products));
    }

    plusCount(id, cart) {
        cart.forEach(item => {
            if (item.id == id) {
                console.log('yes id');
                return item.count += 1;
            }
        return false;
        });
    }

}