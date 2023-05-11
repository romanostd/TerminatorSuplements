import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  constructor(
    private emailService: EmailService,
    private userService: UserService
  ) {}
  hasCustomError = false
  errorMessege : any
  matcher = new MyErrorStateMatcher();
  email = new FormControl('youremail@example.com', [
    Validators.required,
    Validators.email,
  ]);
  confirmationCode = new FormControl();
  newPassword = new FormControl();
  code?: string;
  resetPassWordSteps: string = 'sendEmail';
  userExist: any;

  ngOnInit(): void {}

  makeid(length = 6): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  resetFirstStap() {
    this.userService.get().subscribe((user) => {
      this.userExist = user.find(
        (element) => element.email == this.email.value
      );
      if (this.userExist != undefined) {
        this.code = this.makeid();
        this.emailService.reset(this.email.value, this.code).subscribe();
        this.resetPassWordSteps = 'confirmationCode';
        this.hasCustomError = false
      }

      else {
        this.hasCustomError = true
        this.errorMessege = 'This email dont exist in the system'
      }
    });
  }

  resetSecondStep() {
    if (this.code == this.confirmationCode.value) {
      this.resetPassWordSteps = 'resetPassword';
      this.hasCustomError = false
    }

    else {
      this.hasCustomError = true
      this.errorMessege = 'Invalid code'
    }
  }

  async confirmNewPassword() {
    console.log(this.userExist)
    this.userExist.password = this.newPassword.value;
    await this.userService.put(this.userExist);
    this.resetPassWordSteps = 'sucsses';
  }
}
