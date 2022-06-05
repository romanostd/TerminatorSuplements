import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  form: FormGroup = this.fb.group({

    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  })
  
  login(){
    this.loginService.login(this.form.value.email, this.form.value.password).subscribe(user => console.log(user))
  }

}
