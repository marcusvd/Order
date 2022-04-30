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
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class SellService extends CrudService<any, number>{

  record: ProductDto = new ProductDto();
  private form: FormGroup;

  constructor(
    override Http: HttpClient,
    public ModalService: BsModalService,
    private Navigation: Router,
    private AlertsToastr: AlertsToastr,
    private _Fb: FormBuilder
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


  get paymentArray(): string[] {
  const payments: string[] = ['Dinheiro', 'Pix', 'Débito', 'Crédito', 'Transferência'];
  return payments;
}
  get formGet(): FormGroup {
   return this.form;
}


formLoad() {
console.log(this.getRecord.quantity)
  return this.form = this._Fb.group({
    quantity: ['', [Validators.required, this.qtsValidators]],
    price: ['', []],
    dateSell: ['', []],
    payment: ['', []],
  })
}


  get getRecord() {
  return this.record;
}





qtsValidators(control: AbstractControl): {[key: string]: any} | null{
  if (control.value && control.value.length > this.record.quantity) {
    return { 'Venda excedendo o número de produtos em estoque.': this.record.quantity };
  }
  return null;
}



}


