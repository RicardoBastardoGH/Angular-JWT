import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  URL = environment.apiUrl;

  constructor( private http: HttpClient) { }

  getCompanies(): any {
    return this.http.get<any>(this.URL + '/api/companies');
  }

  getCompanyById(idCompany: string): any {
    return this.http.get<any>(this.URL + '/api/companies/' + idCompany);
  }

  updateCompany(idCompany: string, newCompany): any {
    return this.http.put<any>(this.URL + '/api/companies/' + idCompany, newCompany);
  }

  deleteCompany(idCompany: string): any {
    console.log('Estoy en el servicio '+ idCompany)
    return this.http.delete<any>(this.URL + '/api/companies/' + idCompany);
  }

  agregarCompany( newCompany): any {
    return this.http.post<any>(this.URL + '/api/companies/', newCompany);
  }
}
