import { Product } from 'src/app/models/app.product';



export class ShoppingCart {
    dateCreated!: number;

    constructor(public items: ShoppingCartItem[]) { }
    
    get cartItems() {
        return this.items
    }
    get totalPrice(): number {
        let sum = 0
        for (let i in this.items) {
            sum += this.items[i].totalPrice
        }
        return sum;
    }
    get totalItemsCount(): number {
        let count = 0;
        if (this.items) {
            this.items.forEach((item: any) => {
                count += item.quantity;
            })
        }
        return count;
    }
    getQuantity(product: Product): number {

        let quantity = 0;
        this.items?.forEach(item => {

            if (item.product.id === product.id)
                quantity = item.quantity;
            })
            return quantity;
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