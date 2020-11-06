import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

signup( user ): any{

console.log(`${this.URL}/api/companies`);
return this.http.post<any>(`${this.URL}/api/auth/signup`, user);
 // return this.http.get<any>(`${this.URL}/api/companies`, user);

}

}
