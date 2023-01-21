import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserComponent } from '../user/users/user/user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService, public dialog: MatDialog , private router : Router) { }

  ngOnInit(): void {
  }

  form: FormGroup = this.fb.group({

    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  })

  login() {
    this.loginService.login(this.form.value.email, this.form.value.password).subscribe(token => {
      if(token != undefined)
      this.router.navigate(['/'])
    })
  }

  openDialog() {
    this.dialog.open(UserComponent, {
    });


  }

}
