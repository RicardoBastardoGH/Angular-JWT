import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    // username: new FormControl('ricardoPersona', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  hasError: boolean;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.hasError = false;
    
    localStorage.removeItem('token');
  }

    // convenience getter for easy access to form fields
    // tslint:disable-next-line: typedef
    get f() { return this.loginForm.controls; }

    login(): any{
      this.authService.login(this.f.email.value,  this.f.password.value.toString())
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/companies']);

        },
        err => {
          console.log(err);
          Swal.fire(err.error.message);
        }
      );
    }

}
