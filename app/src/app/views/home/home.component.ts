import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(public productService: ProductService) {}

  isLoading = true;

  ngOnInit() {
    this.isLoading = true;
    this.productService.get().subscribe(product => {
      this.productService.products = product;
      this.isLoading = false;
    });
  }

  addToCart() {
    alert("in development");
  }
}
