import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAlertModule, NgbCollapseModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './common/Components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReferenceDataComponent } from './components/reference-data/reference-data.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReferenceDataHistoryComponent } from './components/reference-data-history/reference-data-history.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductFieldsComponent } from './components/reference-data/product-fields/product-fields.component';
import { MaterialsComponent } from './components/reference-data/materials/materials.component';
import { ProductDetailsPopupComponent } from './components/products/product-details-popup/product-details-popup.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/login/register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    ReferenceDataComponent,
    ReferenceDataHistoryComponent,
    ProductsComponent,
    AddProductComponent,
    ProductFieldsComponent,
    MaterialsComponent,
    ProductDetailsPopupComponent,
    LoginComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    //NgbModule,
    NgbModalModule,
    NgbAlertModule,
    NgbCollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
