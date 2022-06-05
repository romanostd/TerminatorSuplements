import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean  {
    return this.loginService.isLoggedIn()
  }

  user(): any {
   return this.loginService.user
  }

  logout()  {
    this.loginService.logout()
  }

}
