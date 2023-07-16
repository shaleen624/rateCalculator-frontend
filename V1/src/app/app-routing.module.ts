import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReferenceDataComponent } from './components/reference-data/reference-data.component';
import { ReferenceDataHistoryComponent } from './components/reference-data-history/reference-data-history.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  //{ path: '', component: LandingPageComponent },
  //{ path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  //{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  //{ path: 'unauthorized', component: UnauthorizedComponent }
  { path: 'login', component: LoginComponent},
  { path: 'reference-data', component: ReferenceDataComponent },
  { path: 'history', component: ReferenceDataHistoryComponent },
  { path: '', component: ProductsComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
