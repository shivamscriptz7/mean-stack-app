// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { ProductsComponent } from './pages/products/products.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'products', component: ProductsComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
//   { path: 'register', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}


















// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { LoginComponent } from './pages/login/login.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { ProductsComponent } from './pages/products/products.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },

//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'products', component: ProductsComponent },

//   { path: 'dashboard', component: DashboardComponent },

//   { path: '**', redirectTo: 'login' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ✅ Protected routes - sirf logged in user access kar sakta hai
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
