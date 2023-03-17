import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/components/template/header/header.component';
import { Product } from 'src/app/models/product.model';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public productService: ProductService,

  ) {}

   ngOnInit() {
     this.productService.get().subscribe(product => {
      this.productService.products = product
    });;
  }

  select(product: Product) {}
}



