import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent  {



  constructor(private fb: FormBuilder, private emailService: EmailService, private router : Router) { }

  ngOnInit(): void {
  }

  form: FormGroup = this.fb.group({

    email: this.fb.control('', [Validators.required, Validators.email]),
    _subject: this.fb.control('', [Validators.required]),
  })

  reset() {
    this.emailService.reset().subscribe()
  }

}
