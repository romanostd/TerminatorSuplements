import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardsService } from './guards/guards.service';
import { CategoriesComponent } from './views/categories/categories.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProductCreateComponent } from './views/product/productCreate/product-create.component';
import { ProductDetailComponent } from './views/product/productDetail/product-detail.component';
import { ProductsComponent } from './views/product/products/products.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { UsersComponent } from './views/user/users/users.component';




const routes: Routes = [{
  path: "",
  component: HomeComponent
},
{
  path: "login",
  component: LoginComponent
},
{
  path: "resetPassword",
  component: ResetPasswordComponent
},
{
  path: "product/detail/:id",
  component: ProductDetailComponent
},
{
  path: "products",
  component: ProductsComponent, canActivate: [GuardsService]
},
{
  path: "user",
  component: UsersComponent , canActivate: [GuardsService]
},
{
  path: "categories",
  component: CategoriesComponent , canActivate: [GuardsService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
