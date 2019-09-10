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
  subscription: Subscription;    // to unsubscribe.
  filteredProducts=[];

  category;

  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute) { 

    }

  ngOnInit() {
    this.subscription = this.productService.getProducts().subscribe(products => {
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
  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
