import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Categories } from "src/app/models/categories.model";
import { CategoriesService } from "src/app/services/categories.service";
import { CategoryComponent } from "./category/category.component";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
  ) {}

  categoryList: Categories[] = [];

  ngOnInit() {
    this.categoriesService.get().subscribe(categorie => {
      this.categoryList = categorie;
    });
  }

  displayedColumns: string[] = ["name", "action"];

  // pesquisar(query: string) {}

  delete(selectedCategory: Categories) {
    this.categoriesService.remove(selectedCategory.category_id).subscribe();
    this.categoryList.splice(this.categoryList.indexOf(selectedCategory), 1);
    this.categoryList = [...this.categoryList];
  }

  openDialog(categoryData?: Categories) {
    const dialogRef = this.dialog.open(CategoryComponent, {
      data: categoryData,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.categoriesService.get().subscribe(categorie => {
        this.categoryList = categorie;
      });
    });
  }
}
