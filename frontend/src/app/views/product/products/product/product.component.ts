import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,

  ) { }

  product?: Product
  title = 'CRIAR PRODUTO'

  ngOnInit(): void {

    if (this.data != undefined) {
      this.productService.getById(this.data.id).subscribe(product => {
        this.product = product
      })
      this.title = 'EDITAR PRODUTO'
    }
  }

  form: FormGroup = this.fb.group({

    name: [this.data?.name, this.product?.name],
    descreption: [this.data?.descreption, this.product?.descreption],
    imageUrl: [this.data?.imageUrl, this.product?.imageUrl],
    price: [this.data?.price, this.product?.price],
    categoryId: [this.data?.categoryId, this.product?.categoryId],
    userId: [this.data?.categoryId, this.product?.userId],
  })


   saveProduct() {
    if (this.data != undefined) {
       this.productService.put(this.form.value, this.data.id).subscribe();
    }
    else {
       this.productService.post(this.form.value).subscribe();
    }
    this.dialogRef.close(this.form.value);
  }

}
