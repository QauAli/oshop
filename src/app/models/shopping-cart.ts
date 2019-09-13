import { Item } from './item';


export class ShoppingCart{

    // items:Item[]; no need because defined in constructor

    constructor(public items:Item[]){
        
    }

    get quantity() {                            //it was not working because items where not initialized.
        let totalQuantity = 0;
        
        for(let productId in this.items){
            totalQuantity += this.items[productId].quantity;
        }
        return totalQuantity;
    }


}