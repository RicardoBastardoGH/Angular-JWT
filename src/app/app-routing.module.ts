import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import {CompaniesComponent} from './components/companies/companies.component';
import { NavbarComponent} from './shared/navbar/navbar.component';
import { AuthGuard } from './auth.guard';
import { CompaniyCrudComponent } from './components/companiy-crud/companiy-crud.component';
import { CompaniyCreateComponent } from './components/companiy-create/companiy-create.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'companyCrud',
    component: CompaniyCrudComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'companyCreate',
    component: CompaniyCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
