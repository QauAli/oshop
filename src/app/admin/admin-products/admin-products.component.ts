import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
 

  productsSnapshot:any[];
  //filteredProducts:any[];
  
  filteredProducts=[];
  products=[];

  subscription:Subscription;

  constructor(private productService:ProductService) {
    this.subscription = this.productService.getProducts().subscribe(products=>{
      this.productsSnapshot=this.filteredProducts=products;
      //console.log(this.products);

      

      this.productsSnapshot.forEach(product=>{
        this.products.push( 
          {key:product.payload.key,
           title:product.payload.val().title,
           imageUrl:product.payload.val().imageUrl,
           price:product.payload.val().price,
           category:product.payload.val().category
            });
            this.filteredProducts = this.products;
      })

      //console.log(this.filteredProducts);

    });
   }

  


  filter(query:string){
    //console.log(query);

    this.filteredProducts = (query)? this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):this.products;
    //console.log(this.filteredProducts);



  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
