export class StorageService {

    constructor() {
    }

    saveDataToLocalStorage(id: number, price: number)
    {
        if(localStorage.getItem("cart")) {
            const cart = JSON.parse(localStorage.getItem("cart"));
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
        localStorage.setItem("cart", JSON.stringify(products));
    }

}