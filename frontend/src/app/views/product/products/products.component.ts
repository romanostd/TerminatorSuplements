import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService,
    public dialog: MatDialog) { }

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


  openDialog(data: Product) {
    const dialogRef = this.dialog.open(ProductComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      const index = result.id
      this.lista[0] = result
      // this.lista = [...result];
    });
  }
}
