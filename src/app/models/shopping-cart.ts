import { ThisReceiver } from '@angular/compiler';
import { Product } from 'src/app/models/app.product';



export class ShoppingCart {
    dateCreated!: number;

    constructor(public items: ShoppingCartItem[]) { }
    
    get cartItems() {
        
        return this.items
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

export class ShoppingCartItem {
    constructor(public product: Product, public quantity: number) {
        
    }

    get totalPrice() {
        return +this.product.price * this.quantity;
    }
}

export interface ShoppingCartId extends ShoppingCart{
    id: string
}