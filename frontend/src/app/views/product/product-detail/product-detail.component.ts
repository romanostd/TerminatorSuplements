import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private productService: ProductService,) { }

  product?: Product

   ngOnInit() {
   this.productService.getById(4).subscribe(product => {
     this.product = product
    });
    
  }

}
