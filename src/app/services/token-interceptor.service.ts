import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor( private authService: AuthService) { }

  intercept(req,next){
    //  añadiendo una cabecera en cada peticion

    if (!this.authService.loggedIn()){
      const tokenizeReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
              .set('x-access-token', 'Bearer ' + this.authService.getToken())
      });
      return next.handle(tokenizeReq);
      
    }else{
      const tokenizeReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
              .set('x-access-token', this.authService.getToken())
        });
        return next.handle(tokenizeReq);
    }

    
  }


}
