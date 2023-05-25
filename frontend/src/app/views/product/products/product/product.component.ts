import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    public dialogRef: MatDialogRef<ProductComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: Product,

  ) { }
  categories : any
  users : any
  product?: Product
  title = 'CRIAR PRODUTO'

  ngOnInit(): void {
    if (this.data != undefined) {
      this.title = 'EDITAR PRODUTO'
    }
    this.categoriesService.get().subscribe( categorie => {
      this.categories = categorie
    })
  }

  form: FormGroup = this.fb.group({
    product_id: [this.data?.product_id, Validators.required],
    category_id: [this.data?.category_id, Validators.required],
    name: [this.data?.name, Validators.required],
    description: [this.data?.description, Validators.required],
    imageUrl: [this.data?.imageUrl, Validators.required],
    price: [this.data?.price, Validators.required],
    quantity: [this.data?.quantity, Validators.required],

  })


   saveProduct() {
    if (this.data != undefined) {
       this.productService.put(this.form.value).subscribe();
    }
    else {
       this.productService.post(this.form.value).subscribe();
    }
    this.dialogRef.close(this.form.value);
  }

}
