import { async } from '@angular/core/testing';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  
  products = [];                //reponse to product mapping.
  subscriptionProducts: Subscription;    // to unsubscribe.
  filteredProducts=[];

  subscriptionCart: Subscription;
  shoppingCart;

  category;

  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private shoppingCartService:ShoppingCartService) { 

    }

  async ngOnInit() {
    this.subscriptionProducts = this.productService.getProducts().subscribe(products => {
      products.forEach(product => {
        this.products.push(
          {
            key: product.payload.key,
            ...product.payload.val()
          });
      })
      this.filteredProducts = this.products;

      this.activatedRoute.queryParamMap.subscribe(params=>{
        this.category = params.get('category');
  
        this.filteredProducts = (this.category)?this.products.filter(p=>p.category===this.category)
        :this.products;
  
      });

    });

    (await this.shoppingCartService.getcart()).subscribe(cart=>{
      this.shoppingCart = cart;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionProducts.unsubscribe();
    this.subscriptionCart.unsubscribe();
  }

}
