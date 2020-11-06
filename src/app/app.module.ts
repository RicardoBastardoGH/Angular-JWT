import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DataTablesModule } from 'angular-datatables';
import { CompaniyCrudComponent } from './components/companiy-crud/companiy-crud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CompaniyCreateComponent } from './components/companiy-create/companiy-create.component';


@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    NavbarComponent,
    CompaniyCrudComponent,
    CompaniyCreateComponent
  ],
  exports: [ DataTablesModule] ,
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
