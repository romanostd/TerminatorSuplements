import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { LoginService } from "src/app/services/login.service";
import { ProductService } from "src/app/services/product.service";
import { ProductComponent } from "./product/product.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private loginService: LoginService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  productList: Product[] = [];

  ngOnInit() {
    if (this.loginService.user.admin != true) this.router.navigate(["login"]);
    this.productService.get().subscribe(product => {
      this.productList = product;
    });
  }

  displayedColumns: string[] = ["id", "name", "price", "categorie", "action"];

  // pesquisar(query: string) {}

  delete(lista: Product) {
    this.productService.remove(lista.product_id).subscribe();
    this.productList.splice(this.productList.indexOf(lista), 1);
    this.productList = [...this.productList];
  }

  openDialog(data?: Product) {
    const dialogRef = this.dialog.open(ProductComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.productService.get().subscribe(product => {
        this.productList = product;
      });
    });
  }
}
