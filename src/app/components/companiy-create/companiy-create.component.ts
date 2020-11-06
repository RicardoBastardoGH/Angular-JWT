import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-companiy-create',
  templateUrl: './companiy-create.component.html',
  styleUrls: ['./companiy-create.component.scss']
})
export class CompaniyCreateComponent implements OnInit {

  company = {};

  registerForm = new FormGroup({
    name : new FormControl(null, Validators.required),
    email : new FormControl(null, [Validators.required, Validators.email]),
    rif : new FormControl(null, Validators.required),
    address : new FormControl(null, Validators.required),
    phone : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    razon_social : new FormControl(null, Validators.required)

  });

  constructor(private companyService: CompaniesService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registrarCompany(): any {
    console.log('registro ' + this.registerForm.value);
    this.company = {
            name: this. registerForm.value.name,
            email: this.registerForm.value.email,
            rif: this.registerForm.value.rif,
            phone: this.registerForm.value.phone,
            address: this.registerForm.value.address,
            razon_social: this.registerForm.value.razon_social,
        };
    console.log(this.company);

    this.companyService.agregarCompany(this.company)
          .subscribe(
            res => {
              Swal.fire('Compañia agregada exitosamente!');
              this.router.navigate(['/companies']);
            },
            err => {
              console.log(err);
              Swal.fire(err.error.message);
            }
        )
    }
  }

