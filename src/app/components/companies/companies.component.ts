import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Subject } from 'rxjs';
import { CompaniesService } from '../../services/companies.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  
  companies = [];

  idForm = new FormGroup({
    companyId : new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(12)] )
  });
  idFormDelete = new FormGroup({
    companyId : new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(12)] )
  });
  
  dtTrigger: Subject<any> = new Subject();
  constructor( private companiesService: CompaniesService,
               private router: Router) { }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
    };
    
    this.companiesService.getCompanies()
    .subscribe(
      res => {
        console.log(res);
        this.companies = res;
        this.dtTrigger.next();

      },
      err => {
        console.log(err);
        //this.companies = r
      }
    );
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender2(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

      this.ngAfterViewInit();
    });
  }  someClickHandler(info: any): void {
      /* console.log('a navegar');
      console.log(info);
 */
      //this.router.navigate(['/companyCrud'], { state: { info} });
    }
    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first 
          //debugger;
          var table = $('#favoriteTable').DataTable();
  
          $('#tableDestroy').on('click', function () {
              table.destroy();
          });
  
          dtInstance.destroy();
  
         // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
  }
    companyOptions(): void{
      if (this.idForm.value.companyId.length > 23 && this.idForm.value.companyId.length < 26  ) {
        this.companiesService.getCompanyById(this.idForm.value.companyId)
        .subscribe(
          res => {
            this.router.navigate(['/companyCrud'], { state: { res} });
          },
          err => {
            Swal.fire('No se encontro ninguna compañia registrada el id: ' + this.idForm.value.companyId);
          }
        );
      }
      else {
        Swal.fire('ID Invalido');
      }
    }

    deleteCompany(): any{
      this.companiesService.deleteCompany(this.idFormDelete.value.companyId)
      .subscribe(
        res => {
          Swal.fire('Compañia borrada exitosamente!');
          //this.rerender();
          //this.router.navigate(['/companies']);
          location.reload();

        },
        err => {
          Swal.fire('La compañia no pudo ser borrada');
        }
      );
    }

    agregarCompany(): void{
          this.router.navigate(['/companyCreate']);
    }
}
