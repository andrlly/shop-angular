export class Product {
    constructor(public name: string,
                public description: string,
                public price: number,
                public image: string,
                public category_id: number,
                public id?: string,
                public catName?: number) {
    }
}