import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoriesService } from "src/app/services/categories.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  constructor(
    public router: Router,
    private categoriesService: CategoriesService,
    public productService: ProductService,
  ) {}

  categoriesList: any;

  ngOnInit(): void {
    this.categoriesService.get().subscribe(categories => {
      this.categoriesList = categories;
      this.categoriesService.serviceCategoryList = categories;
    });
  }

  filterByCategory(categoryId: any) {
    this.categoriesService.categoryId = categoryId;
    this.productService.get({ category_id: categoryId }).subscribe(products => {
      this.productService.products = products;
    });
  }

  @HostListener("window:resize", ["$event"])
  isMobileView(): boolean {
    return window.innerWidth <= 768;
  }
}
