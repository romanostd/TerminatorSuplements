import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private loginService : LoginService,
    public dialog: MatDialog, private router : Router) { }

  lista: Product[] = []


  async ngOnInit() {

    if(this.loginService.user.admin != true)
    this.router.navigate(['login'])
    
    this.lista = await this.productService.get()
  }


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];

  pesquisar(query: string){}


  delete(lista: Product) {
    this.productService.remove(lista.id).subscribe()
    this.lista.splice(this.lista.indexOf(lista), 1);
    this.lista = [...this.lista];
  }


   openDialog(data?: Product) {
    const dialogRef = this.dialog.open(ProductComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.lista = await this.productService.get()
    });
  }
}
