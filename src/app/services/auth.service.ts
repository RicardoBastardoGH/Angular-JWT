import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginRoutingModule } from '../auth/login/login-routing.module';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public URL = environment.apiUrl;
  
  constructor(private http: HttpClient,
              private router: Router) { }

    
  login(email, password): Observable <any> {
    console.log(email+'   '+password)
    return this.http.post<any>(`${this.URL}/api/auth/signin`, { email, password });

  }

  logout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loggedIn(): boolean{
    return !!(localStorage.getItem('token'));
  }

  getToken(){
    return localStorage.getItem('token');
  }


}
