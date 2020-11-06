import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig, DateFormatter } from 'ngx-bootstrap/datepicker';
import { Routes, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = {};

  datePickerConfig: Partial<BsDatepickerConfig>;

  registerForm = new FormGroup({
    usuario : new FormControl(null, Validators.required),
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required]),
    nombre : new FormControl(null, Validators.required),
    apellido: new FormControl(null, Validators.required),
    fechaNacimiento : new FormControl(null, Validators.required),
    telefono : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    direccion : new FormControl(null, Validators.required)

  });




  constructor(private userService: UserService,
              private router: Router) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-orange',
        dateInputFormat: 'DD/MM/YYYY',
        isAnimated: true,
        adaptivePosition: true,
        minDate : new Date(1900, 0, 1),
      });

  }

  
  formatDate(fecha: Date){
    // Con formato
    let dia: string;
    let mes: string;
    // Sin formato
    let day = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();

    //  Transformaciones
    if (day < 10) { dia = `0${day}`; }
      else{dia = day.toString(); }
    
    if (month < 10) { mes = `0${month}`; }
      else{ mes = month.toString(); }


        // "fecha": "2020-08-16T15:00:44.859Z",
    return (`${year}-${mes}-${dia}`.toString());
  }

  ngOnInit(): void {
  }
  registrarPersona(): any{
    console.log('registrar');

    this.user = {
                  name: this. registerForm.value.nombre,
                  lastname: this.registerForm.value.apellido,
                  username: this.registerForm.value.usuario,
                  email: this.registerForm.value.email,
                  password: this.registerForm.value.password,
                  phone: this.registerForm.value.telefono,
                  address: this.registerForm.value.direccion,
                  birthday: this.formatDate(this.registerForm.value.fechaNacimiento)
                };
    console.log(this.user);

    this.userService.signup(this.user)
      .subscribe(
        res => {
          console.log(res);
          // alerta
          Swal.fire(
            'Success!',
            'User created successfully.',
            'success'
          );
          localStorage.setItem('token', res.token);
          this.router.navigate(['/companies']);
        },
        err => {
          Swal.fire(
            'warning!',
            err.error.message,
            'warning'
          );
        }
      );
  }

}
