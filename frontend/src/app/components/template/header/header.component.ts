import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { HomeComponent } from 'src/app/views/home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private loginService: LoginService,
    public productService: ProductService
  ) {}

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  user(): any {
    return this.loginService.user;
  }

  logout() {
    this.loginService.logout();
  }

  callSearch(query?: any) {
    this.productService.get(query).subscribe((product) => {
      this.productService.products = product;
    });
  }
}
