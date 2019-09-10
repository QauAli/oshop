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

  
  productsSnapshot: any[];      //response of firebase.
  products = [];                //reponse to product mapping.
  subscription: Subscription;    // to unsubscribe.
  filteredProducts=[];

  categories$;
  activeCategory;

  constructor(private productService:ProductService,
    private categoryService:CategoryService,
    private activatedRoute:ActivatedRoute) { 

    }

  ngOnInit() {
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
      this.filteredProducts = this.products;

      this.activatedRoute.queryParamMap.subscribe(params=>{
        this.activeCategory = params.get('category');
  
        this.filteredProducts = (this.activeCategory)?this.products.filter(p=>p.category===this.activeCategory)
        :this.products;
  
      });

    });

 
    this.categories$ = this.categoryService.getCategories();

  

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
