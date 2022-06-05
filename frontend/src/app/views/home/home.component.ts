import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService
    , private loginService: LoginService) { }

  products?: Product[]
  any: any
  any2: any


  async ngOnInit() {
    this.products = await this.productService.get()
    this.any =this.loginService.getToken()
    console.log(this.any)

  }

  selecionar(product: Product) {
  }

}


