import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService,
    public dialog: MatDialog) { }

  lista: User[] = []


  async ngOnInit() {
    this.lista = await this.userService.get()
  }


  displayedColumns: string[] = ['position', 'name', 'weight', 'action'];

  pesquisar(query: string){}


  delete(lista: User) {
    this.userService.remove(lista.id).subscribe()
    this.lista.splice(this.lista.indexOf(lista), 1);
    this.lista = [...this.lista];
  }


   openDialog(data?: User) {
    const dialogRef = this.dialog.open(UserComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.lista = await this.userService.get()
    });
  }

}
