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
  products: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.readProducts()
      .subscribe(products =>
        this.products = products['records']
      );
  }

}
