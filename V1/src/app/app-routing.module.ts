import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReferenceDataComponent } from './components/reference-data/reference-data.component';
import { ReferenceDataHistoryComponent } from './components/reference-data-history/reference-data-history.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  //{ path: '', component: LandingPageComponent },
  { path: '', component: ProductsComponent },
  { path: 'reference-data', component: ReferenceDataComponent },
  { path: 'history', component: ReferenceDataHistoryComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
