import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  user?: User;
  title = "CREATE USER";

  ngOnInit(): void {
    if (this.data != undefined) {
      this.title = "EDIT USER";
    }
  }

  form: FormGroup = this.fb.group({
    user_id: [this.data?.user_id],
    name: [this.data?.name, Validators.required],
    email: [
      this.data?.email,
      Validators.compose([Validators.email, Validators.required]),
    ],
    password: ["", Validators.required],
    admin: [this.data?.admin],
  });

  saveUser(): void {
    if (this.data != undefined) {
      this.form.controls.admin.setValue(
        this.form.controls.admin.value == "true",
      );
      this.userService.put(this.form.value).subscribe({
        next: () => {
          this.dialogRef.close(this.form.value);
        },
        error: error => {
          console.error(error);
        },
      });
    } else {
      this.form.controls.admin.setValue(false);
      console.log(this.form.value);
      this.userService.post(this.form.value).subscribe({
        next: () => {
          this.dialogRef.close(this.form.value);
        },
        error: error => {
          console.error(error);
        },
      });
    }
  }
}
