import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,

  ) { }

  user?: User
  title = 'CRIAR USUARIO'

  ngOnInit(): void {

    if (this.data != undefined) {
      this.userService.getById(this.data.id).subscribe(user => {
        this.user = user
      })
      this.title = 'EDITAR USUARIO'
    }
  }

  form: FormGroup = this.fb.group({

    name: [this.data?.nome, this.user?.nome],
    email: [this.data?.email, this.user?.email],
    password: [this.data?.password, this.user?.password],
    admin: [this.data?.admin, this.user?.admin],
  })


  async saveUser() {
    if (this.data != undefined) {
      await this.userService.put(this.form.value, this.data.id);
    }
    else {
      await this.userService.post(this.form.value);
    }
    this.dialogRef.close(this.form.value);
  }

}
