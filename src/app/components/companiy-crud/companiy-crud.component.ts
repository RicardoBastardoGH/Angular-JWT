import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig, BsDatepickerModule, DateFormatter } from 'ngx-bootstrap/datepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompaniesService } from '../../services/companies.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-companiy-crud',
  templateUrl: './companiy-crud.component.html',
  styleUrls: ['./companiy-crud.component.scss']
})
export class CompaniyCrudComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  datePickerConfig: Partial<BsDatepickerConfig>;

  data: any ;

  company: any;
  newCompany: {};
  newCompanyTest: {};

  registerForm = new FormGroup({
    name : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    address : new FormControl('', Validators.required),
    phone : new FormControl('', Validators.required),
    rif : new FormControl('', Validators.required),
    razon_social : new FormControl('', Validators.required),
  });

  name: string;
  email: string;
  address: string;
  phone: string;
  rif: string;
  razon_social: string;

  public usuario: any;

  constructor(private router: Router,
              private companiesService: CompaniesService) {
    this.data = window.history.state;
    this.datePickerConfig = Object.assign({},
    {
    containerClass: 'theme-blue',
    dateInputFormat: 'DD/MM/YYYY',
    isAnimated: true,
    adaptivePosition: true
    });
}


  ngOnInit(): void {
    console.log('DATA: ' + this.data);
    if (this.data.navigationId === 1) {
      console.log('no hay data, aca ns devolvemos, chauuuu');
      this.router.navigate(['/companies']);
    }else{
      this.company = (this.data.res);

      // guardando valores
      this.name = this.data.res.name;
      this.email = this.data.res.email;
      this.address = this.data.res.address;
      this.phone = this.data.res.phone;
      this.rif = this.data.res.rif;
      this.razon_social = this.data.res.razon_social;
    }
  }

  cleanObject(obj): any {
    // tslint:disable-next-line: forin
    for (var propName in obj) { 
      console.log('-----' + propName +' '+ obj[propName] );
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
    console.log(obj)

    this.companiesService.updateCompany(this.company._id, obj )
    .subscribe(
      res => {
        Swal.fire('Usuario Actualizado con exito');
        this.router.navigate(['/companies']);
      },
      err => {
        console.log(err);
        Swal.fire('No se pudo actualizar este usuario');
      }
    );
      }
  
  updateCompany(): any {
    const companyClean = this.cleanObject(this.registerForm.value);
  }
}
