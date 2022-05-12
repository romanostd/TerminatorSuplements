import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {



  constructor
    (
      private fb: FormBuilder,
      private productService: ProductService,
      private router: Router
    ) { }

  ngOnInit(): void {
    
  }

  product?: Product

  form: FormGroup = this.fb.group({

    name: ['',this.product?.name],
    descreption: ['',this.product?.descreption],
    imageUrl: ['',this.product?.imageUrl],
    price: ['',this.product?.price],
    categoryId: ['',this.product?.categoryId],
    userId: ['',this.product?.userId],
  })
 

  async createProduct() {

    await this.productService.post(this.form.value);
    this.router.navigate(['/'])

  }
}
