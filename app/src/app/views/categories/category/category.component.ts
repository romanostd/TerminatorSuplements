import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Categories } from "src/app/models/categories.model";
import { CategoriesService } from "src/app/services/categories.service";
import { UserComponent } from "../../user/users/user/user.component";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public categoryData: Categories,
  ) {}

  categories?: Categories;
  title = "CREATE CATEGORY";

  ngOnInit(): void {
    if (this.categoryData != undefined) {
      this.categoriesService
        .getById(this.categoryData.category_id)
        .subscribe(categories => {
          this.categories = categories;
        });
      this.title = "EDIT CATEGORY";
    }
  }

  form: FormGroup = this.fb.group({
    category_id: [this.categoryData?.category_id],
    name: [this.categoryData?.name, Validators.required],
  });

  saveCategoy() {
    of(this.form.value)
      .pipe(
        switchMap(formValue =>
          this.categoryData != undefined
            ? this.categoriesService.put(formValue)
            : this.categoriesService.post(formValue),
        ),
      )
      .subscribe({
        next: () => {
          this.dialogRef.close(this.form.value);
        },
        error: () => {},
      });
  }
}
