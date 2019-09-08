import { ProductService } from './../../product.service';
import { Observable } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$:Observable<any>;

  constructor(private categoryService:CategoryService, private productService:ProductService) {
    this.categories$ = this.categoryService.getCategories();
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


  }

}
