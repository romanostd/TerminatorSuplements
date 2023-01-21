import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categories } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesService: CategoriesService,
    public dialog: MatDialog) { }

  lista: Categories[] = []

  async ngOnInit() {
    this.lista = await this.categoriesService.get()
  }


  displayedColumns: string[] = ['position', 'name', 'action'];

  pesquisar(query: string) { }


  delete(lista: Categories) {
    this.categoriesService.remove(lista.id).subscribe()
    this.lista.splice(this.lista.indexOf(lista), 1);
    this.lista = [...this.lista];
  }

  openDialog(data?: Categories) {
    const dialogRef = this.dialog.open(CategoryComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.lista = await this.categoriesService.get()
    });
  }
}
