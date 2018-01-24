export class OrderProduct {
    constructor(public price: number,
                public count: number,
                public product_id: number,
                public order_user_id: number) {
    }
}