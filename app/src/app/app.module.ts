import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./components/template/header/header.component";
import { FooterComponent } from "./components/template/footer/footer.component";
import { NavComponent } from "./components/template/nav/nav.component";
import { MatListModule } from "@angular/material/list";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { HomeComponent } from "./views/home/home.component";
import { LoginComponent } from "./views/login/login.component";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ProductService } from "./services/product.service";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { ProductDetailComponent } from "./views/product/productDetail/product-detail.component";
import { ProductsComponent } from "./views/product/products/products.component";
import { MatTableModule } from "@angular/material/table";
import { ProductComponent } from "./views/product/products/product/product.component";
import { UsersComponent } from "./views/user/users/users.component";
import { UserComponent } from "./views/user/users/user/user.component";
import { CategoriesComponent } from "./views/categories/categories.component";
import { CategoryComponent } from "./views/categories/category/category.component";
import { GuardsService } from "./guards/guards.service";
import { ResetPasswordComponent } from "./views/reset-password/reset-password.component";
import { MatSelectModule } from "@angular/material/select";
import { CepPipe } from "./pipes/cep.pipe";

// import { PlaygroundComponent } from './views/playground/playground.component';

@NgModule({
  declarations: [
    AppComponent,
    CepPipe,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    ProductDetailComponent,
    ProductsComponent,
    ProductComponent,
    UsersComponent,
    UserComponent,
    CategoriesComponent,
    CategoryComponent,
    ResetPasswordComponent,
    // PlaygroundComponent
  ],
  imports: [
    MatTableModule,
    BrowserModule,
    MatSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ProductService, GuardsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
