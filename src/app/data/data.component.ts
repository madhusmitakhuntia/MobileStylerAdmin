import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../product';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [ProductService]
})
export class DataComponent implements OnInit {
  products: any={};
  items: any=[];
  // products:Product[];
 
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.readProducts()
      .subscribe(products =>{
        this.products = products['products']
        //console.log(products);
        //console.log(products.products);
       // console.log(Object.keys(products.products)[0]);
        // console.log((Object.values(products.products)[2].pname);
        //console.log((Object.values(products.products)[2]));
        console.log((Object.values(products.products)));
        console.log(Object.values(products.products).length);
        this.items = Object.values(products.products);
        
        console.log("Item data:"+this.items);
 
      });
      
      
  }
 
}
