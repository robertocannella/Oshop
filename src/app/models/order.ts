import { ShoppingCart, ShoppingCartItem } from './shopping-cart';
export class Order{
    datePlaced!: number;
    items: any[] = [];

    constructor(public userId: string | undefined, public shipping: any, cart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = cart.items.map((i:ShoppingCartItem) => {
        return {
          product: {
            title: i.product.title,
            imgUrl: i.product.imageUrl,
            price: i.product.price,
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
        
      })
    }


}