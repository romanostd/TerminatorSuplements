import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  admin = new FormControl();
  user?: User
  title = 'CREATE USER'

  ngOnInit(): void {
    if (this.data != undefined) {
      this.title = 'EDIT USER'
    }
  }

  form: FormGroup = this.fb.group({
    user_id: [ this.data?. user_id],
    name: [ this.data?.name, Validators.required],
    email: [this.data?.email, Validators.compose(
      [Validators.email, Validators.required])],
    password: [this.data?.password, Validators.required],
    admin: [this.data?.admin],
  })


  async saveUser() {
    if (this.data != undefined) {
      this.form.controls.admin.value == 'true' ? this.form.controls.admin.setValue(true) : this.form.controls.admin.setValue(false)
      await this.userService.put(this.form.value);
    }
    else {
      this.form.controls.admin.setValue(false)
      await this.userService.post(this.form.value);
    }
    this.dialogRef.close(this.form.value);
  }

}
