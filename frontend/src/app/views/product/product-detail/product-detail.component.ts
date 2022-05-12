import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router , private route: ActivatedRoute) { }

  product?: Product

  ngOnInit() {
    const id  = this.route.snapshot.paramMap.get('id')
    this.productService.getById(id).subscribe(product => {
      this.product = product
    });
  }

}
