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

  list: Categories[] = [];

  ngOnInit() {
    this.categoriesService.get().subscribe(categorie => {
      this.list = categorie;
    });
  }

  displayedColumns: string[] = ["name", "action"];

  pesquisar(query: string) {}

  delete(lista: Categories) {
    this.categoriesService.remove(lista.category_id).subscribe();
    this.list.splice(this.list.indexOf(lista), 1);
    this.list = [...this.list];
  }

  openDialog(data?: Categories) {
    const dialogRef = this.dialog.open(CategoryComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.categoriesService.get().subscribe(categorie => {
        this.list = categorie;
      });
    });
  }
}
