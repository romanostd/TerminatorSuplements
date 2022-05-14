import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  lista: Product[] = []


  async ngOnInit() {
    this.lista = await this.productService.get()
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];


  delete(lista: Product) {
    this.productService.remove(lista.id).subscribe()
    this.lista.splice(this.lista.indexOf(lista), 1);
    this.lista = [...this.lista];
  }
}
