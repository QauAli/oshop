import { Product } from './product';

export class Item{

    constructor(public product:Product, public quantity:number){

    }

    get itemPrice(){
        return((+this.product.price) * this.quantity);
    }

}