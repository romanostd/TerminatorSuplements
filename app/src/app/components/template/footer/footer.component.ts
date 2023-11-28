import { Component } from "@angular/core";
import { CategoriesService } from "src/app/services/categories.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  constructor(
    public categoriesService: CategoriesService,
    public productService: ProductService,
  ) {}

  filterByCategory(categoryId: any) {
    this.productService.get({ category_id: categoryId }).subscribe(products => {
      this.productService.products = products;
    });
  }
}
