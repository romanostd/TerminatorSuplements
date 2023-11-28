import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { CategoriesService } from "src/app/services/categories.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
  ) {}

  product?: Product;
  categoryName: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.getById(id).subscribe((product: any) => {
      this.product = product[0];
      this.categoryService
        .getById(product[0].category_id)
        .subscribe((category: any) => {
          this.categoryName = category[0].name;
        });
    });
  }

  buy() {
    alert("in development");
  }

  toggleFavorite() {
    // this.product.isFavorite = !this.product.isFavorite;
    // [class.active]="product?.isFavorite"
  }
}
