import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CategoriesService } from "src/app/services/categories.service";
import { LoginService } from "src/app/services/login.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(
    private loginService: LoginService,
    public productService: ProductService,
    public categoryService: CategoriesService,
    public router: Router,
  ) {}

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  user() {
    return this.loginService.user;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/"]);
  }

  callSearch(query: string) {
    if (this.categoryService.categoryId == undefined) {
      this.productService.get({ name: query }).subscribe(products => {
        this.productService.products = products;
      });
    } else {
      this.productService
        .get({ name: query, category_id: this.categoryService.categoryId })
        .subscribe(products => {
          this.productService.products = products;
        });
    }
  }

  updateProducts() {
    this.categoryService.categoryId = undefined;
    this.productService.get().subscribe(products => {
      this.productService.products = products;
    });
  }

  goToCart() {
    alert("in development");
  }
}
