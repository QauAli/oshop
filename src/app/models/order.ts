import { Item } from './item';



export interface Order{
    name:string,
    address:string,
    city:string,
    userId:string,
    date:number,
    items:Item[],
    totalPrice:number
}

