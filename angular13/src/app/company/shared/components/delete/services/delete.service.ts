import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { CrudService } from "../../../services/crud.service";
import { Url } from "../../../../back-end/back-end";
import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ProductDto } from "src/app/company/product/dto/product-dto";
import { Router } from "@angular/router";
import { AlertsToastr } from 'src/app/company/shared/services/alerts-toastr';
import { MeasureDto } from "src/app/company/measure/dto/measure-dto";

@Injectable()
export class DeleteService extends CrudService<any, number>{

  record: any = {};

  constructor(
    override Http: HttpClient,
    public ModalService: BsModalService,
    private Navigation: Router,
    private AlertsToastr: AlertsToastr,
  ) { super(Http, '') }
  //Category
  toDeleteCat(id: number) {
    return this.Http.delete<CategoryDto>(`${Url._CATEGORIES}/${id}`)
  }
  //Product
  toDeleteProd(id: number) {
    return this.Http.delete<ProductDto>(`${Url._PRODUCTS}/${id}`)
  }
  //Product
  toDeleteMeas(id: number) {
    return this.Http.delete<MeasureDto>(`${Url._UNITOFMEASURES}/${id}`)
  }

  deleteRecord() {
    //category
    if (this.record.who === 'category') {
      this.toDeleteCat(this.record.id).subscribe({
        next: (item) => {
          this.AlertsToastr.Notice(this.record.name, 2, 'success');
          // this.Navigation.navigateByUrl('prodpagelist');
          this.Navigation.navigateByUrl('catlist').then((item) => {
            if (!item) {
              this.Navigation.navigateByUrl('catUpd');
            }
          });
        }
      }), erro => {
        this.AlertsToastr.Notice(`Erro, registro não foi deletado. ${this.record.name}`, null, 'error');
      };
    }


    //product
    if (this.record.who === 'product') {
      this.toDeleteProd(this.record.id).subscribe({
        next: (item) => {
          this.AlertsToastr.Notice(this.record.name, 2, 'success');

          this.Navigation.navigateByUrl('prodpagelist').then((item) => {
            if (!item) {
              this.Navigation.navigateByUrl('prodpagelistUpd');
            }
          });
        }
      }), error => {
        this.AlertsToastr.Notice(`Erro, registro não foi deletado. ${this.record.name}`, null, 'error');
      };

    }

    //Measure
    if (this.record.who === 'measure') {

      this.toDeleteMeas(this.record.id).subscribe({
        next: (item) => {
          this.AlertsToastr.Notice(this.record.name, 2, 'success');

          this.Navigation.navigateByUrl('measureadm').then((item) => {
            if (!item) {
              this.Navigation.navigateByUrl('measureadmUpd');
            }
          });
        }
      }), error => {
        this.AlertsToastr.Notice(`Erro, registro não foi deletado. ${this.record.name}`, null, 'error');
      };

    }

  }


}


