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
  product={};

  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private router:Router,
    private route:ActivatedRoute) {
    this.categories$ = this.categoryService.getCategories();

    let productId = route.snapshot.paramMap.get('id');
    this.productService.getProduct(productId).pipe(take(1)).subscribe(product=>{
      this.product = product;
      //console.log(product.payload.val());
    });
    

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
    //console.log(product);

    this.productService.create(product);
    this.router.navigate(['/admin/products']);


  }

}
