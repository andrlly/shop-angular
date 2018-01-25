export class Order {
    constructor(public price: number,
                public count: number,
                public product_id: number,
                public user_id: number) {
    }
}