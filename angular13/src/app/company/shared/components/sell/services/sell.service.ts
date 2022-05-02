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
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Injectable()
export class SellService extends CrudService<ProductDto, number>{

  record: ProductDto = new ProductDto();
  private form: FormGroup;
  private limits: boolean = false;


  constructor(
    override Http: HttpClient,
    public ModalService: BsModalService,
    private _Navigation: Router,
    private _AlertsToastr: AlertsToastr,
    private _Fb: FormBuilder
  ) { super(Http, Url._PRODUCTS) }
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


  get paymentArray(): string[] {
    const payments: string[] = ['Dinheiro', 'Pix', 'Débito', 'Crédito', 'Transferência'];
    return payments;
  }
  get formGet(): FormGroup {
    return this.form;
  }
  get limitsBool(): boolean {
    return this.limits;
  }
  //custom validators

  ValidateQts(control?: AbstractControl) {

    if (control.value > parseInt(sessionStorage.getItem('qts'))) {
      return { empty: true };
    }
    return null;
  }

  formLoad(): FormGroup {
    return this.form = this._Fb.group({
      quantity: ['', [Validators.required, this.ValidateQts, Validators.min(0)]],
      discount: ['', []],
      dateSell: ['', [Validators.required]],
      payment: ['', [Validators.required]],
    })
  };

  selling() {
    if (this.record.quantity && this.formGet.get('quantity').value) {

      if (this.formGet.get('quantity').value <= this.record.quantity) {


        ///const result = this.record.quantity - this.formGet.get('quantity').value;
        this.record.quantity = this.record.quantity - this.formGet.get('quantity').value;


        // if (result === 0) {
        //   this.record.quantity = 0;
        // }
        // else {
        //   this.record.quantity = result;
        // }
        console.log(this.record)
        this.update(this.record).subscribe({
          next: ((prod: ProductDto) => {
            this._AlertsToastr.Notice(`Produto,  ${prod.name}`, 1, 'success');
            this._Navigation.navigateByUrl('prodpagelist').then((item) => {
              if (!item) {
                this._Navigation.navigateByUrl('prodpagelistUpd');
              }
            });
          }),
          error: (error) => {
            alert(error)

          },
        });

        return null;
      }
      else {
        alert('deu ruim')
      }






    }



  }



  //   if (this.record.quantity && this.formGet.get('quantity').value) {
  //     this.record.quantity - this.formGet.get('quantity').value;
  //     return this.update(this.record);
  //   }
  //   return null;
  // }


  get getRecord() {
    return this.record;
  }


}
