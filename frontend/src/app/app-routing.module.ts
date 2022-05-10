import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './views/create-product/create-product.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';


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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
