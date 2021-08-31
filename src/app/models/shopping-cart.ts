import { Product } from 'src/app/models/app.product';



export class ShoppingCart {
    dateCreated!: number;
    constructor(public items?: ShoppingCartItem[]) {
        //this.dateCreated = new Date().getTime();
        
    }
     public getTotalItemsCount(): number {
        let count = 0;
        if (this.items) {
            this.items.forEach((item: any) => {
                count += item.quantity;
            })
        }
        return count;
    }

    
}

export interface ShoppingCartItem {
    product: Product;
    quantity: number;
}

export interface ShoppingCartId extends ShoppingCart{
    id: string
}