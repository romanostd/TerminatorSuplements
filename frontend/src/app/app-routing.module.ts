import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProductCreateComponent } from './views/product/productCreate/product-create.component';
import { ProductDetailComponent } from './views/product/productDetail/product-detail.component';
import { ProductsComponent } from './views/product/products/products.component';




const routes: Routes = [{
  path: "",
  component: HomeComponent
},
{
  path: "login",
  component: LoginComponent
},
{
  path: "product/create",
  component: ProductCreateComponent
},
{
  path: "product/detail/:id",
  component: ProductDetailComponent
},
{
  path: "products",
  component: ProductsComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
