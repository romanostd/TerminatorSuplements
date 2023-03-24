import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  user?: User
  title = 'CREATE USER'

  ngOnInit(): void {
    if (this.data != undefined) {
      this.title = 'EDIT USER'
    }
  }

  form: FormGroup = this.fb.group({
    name: [ this.data?.nome, Validators.required],
    email: [this.data?.email, Validators.compose(
      [Validators.email, Validators.required])],
    password: [this.data?.password, Validators.required],
    admin: [this.data?.admin, Validators.required],
  })


  async saveUser() {
    if (this.data != undefined) {
      await this.userService.put(this.form.value, this.data.id);
    }
    else {
      this.form.controls.admin.setValue(false)
      await this.userService.post(this.form.value);
    }
    this.dialogRef.close(this.form.value);
  }

}
