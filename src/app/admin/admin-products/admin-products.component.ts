import { Observable, Subscription, Subject } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  productsSnapshot: any[];      //response of firebase.
  products = [];                //reponse to product mapping.
  subscription: Subscription;    // to unsubscribe.

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();   // We use this trigger because fetching the list of persons can be quite long, thus we ensure the data is fetched before rendering

  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    
    this.subscription = this.productService.getProducts().subscribe(products => {
      this.productsSnapshot = products;
      this.productsSnapshot.forEach(product => {
        this.products.push(
          {
            key: product.payload.key,
            title: product.payload.val().title,
            imageUrl: product.payload.val().imageUrl,
            price: product.payload.val().price,
            category: product.payload.val().category
          });
      })
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
  }
}
