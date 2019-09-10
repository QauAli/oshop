import { Product } from './../../models/product';

import { ProductService } from './../../product.service';
import { Observable } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$:Observable<any>;
  product : Product;
  productId;

  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private router:Router,
    private route:ActivatedRoute) {

      this.product = {
        title:"",
        imageUrl:"",
        price:"",
        key:"",
        category:""
      }

    this.categories$ = this.categoryService.getCategories();

    this.productId = route.snapshot.paramMap.get('id');
    if(this.productId){
      this.productService.getProduct(this.productId).pipe(take(1)).subscribe(product=>{
        this.product = product;
        //console.log(this.product);
      });
    }

    // this.categories$.subscribe(actions => {
    //   actions.forEach(action => {
    //     console.log(action.type);
    //     console.log(action.key);
    //     console.log(action.payload.val());
    //   });
    // });

   }

  ngOnInit() {
  }

  save(product){
    console.log(product);
    
    if(this.productId)
      this.productService.update(this.productId, product);
    else
      this.productService.create(product);
    
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you shure to delete this product!')) return;

    this.productService.delete(this.productId);
    this.router.navigate(['/admin/products']);
  }


}
