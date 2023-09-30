import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { UserComponent } from "./user/user.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) {}

  userList: User[] = [];

  ngOnInit() {
    this.userService.get().subscribe(user => {
      this.userList = user;
    });
  }

  displayedColumns: string[] = ["name", "email", "admin", "action"];

  // pesquisar(query: string) {}

  delete(lista: User) {
    this.userService.remove(lista.user_id).subscribe();
    this.userList.splice(this.userList.indexOf(lista), 1);
    this.userList = [...this.userList];
  }

  openDialog(userData?: User) {
    const dialogRef = this.dialog.open(UserComponent, {
      data: userData,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.userService.get().subscribe(user => {
        this.userList = user;
      });
    });
  }
}
