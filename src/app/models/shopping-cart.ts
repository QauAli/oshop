import { Product } from './product';
import { Item } from './item';


export class ShoppingCart{

    // items:Item[]; no need because defined in constructor
    items:Item[] = [];

    constructor(public shoppingCartObject:{[key:string]:Item}){

        if(!this.shoppingCartObject)
            return;


        for(let item in shoppingCartObject.items){
            this.items.push(new Item(shoppingCartObject.items[item].product, shoppingCartObject.items[item].quantity));
        }
        //console.log(shoppingCartObject);
        console.log(this.items);
    }

    public getItemQuantity(product:Product){
        if(!this.shoppingCartObject || !this.shoppingCartObject.items)
            return 0;

        let item = this.shoppingCartObject.items[product.key];
        console.log(item);

        return item?item.quantity:0;
    }

    get totalPrice(){
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.itemPrice;  //(+item.product.price) convert string to int
        });

        return totalPrice;
    }

    get quantity() { 
        let totalQuantity = 0;
        this.items.forEach(item => {
            totalQuantity += item.quantity;
        });


        return totalQuantity;
    }


}