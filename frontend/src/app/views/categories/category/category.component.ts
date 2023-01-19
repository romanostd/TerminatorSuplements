import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { UserComponent } from '../../user/users/user/user.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categories,

  ) { }

  categories?: Categories
  title = 'CREATE USER'

  ngOnInit(): void {

    if (this.data != undefined) {
      this.categoriesService.getById(this.data.id).subscribe(categories => {
        this.categories = categories
      })
      this.title = 'EDIT CATEGORY'
    }
  }

  form: FormGroup = this.fb.group({
    name: [this.data?.name, this.categories?.name],
    parentId: [this.data?.parantId, this.categories?.parantId],
  })


  async saveUser() {
    if (this.data != undefined) {
      await this.categoriesService.put(this.form.value, this.data.id);
    }
    else {
      await this.categoriesService.post(this.form.value);
    }
    this.dialogRef.close(this.form.value);
  }

}
