import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { CreateProductComponent } from './views/product/createProduct/create-product.component';
import { ProductDetailComponent } from './views/product/product-detail/product-detail.component';



const routes: Routes = [{
  path: "",
  component: HomeComponent
},
{
  path: "login",
  component: LoginComponent
},
{
  path: "product",
  component: CreateProductComponent
},
{
  path: "detail",
  component: ProductDetailComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
