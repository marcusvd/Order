import { UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductDto } from 'src/app/company/product/dto/product-dto';
import { SellService } from './services/sell.service';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { AlertsToastr } from '../../services/alerts-toastr';

@Component({
  selector: 'sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  FORM: FormGroup;
  warning: string;

  constructor(
    private _sellService: SellService,
    private _modalRef: BsModalRef,
    private _ValidatorsSrv: ValidatorsService,
    private _AlertsToastr: AlertsToastr,
    private _Navigation: Router,



  ) { registerLocaleData(localeBr, 'br'); }

  doHide() {
    this._modalRef.hide();
  }

  get getRecord() {
    return this._sellService.getRecord;
  }

  get limitsBool(): boolean {
    return this._sellService.limitsBool;
  }


  get form(): FormGroup {
    return this._sellService.formGet;
  }

  get pay(): string[] {
    return this._sellService.paymentArray;
  }


  required(form: FormGroup, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {
    return this._ValidatorsSrv.required2(form,
      ctrl,
      ctrlToShow,
      lengthMin,
      lengthMax
    )
  }
  touchedErrors(ctrl: string, formGroup: FormGroup) {
    return this._ValidatorsSrv.touchedErrors(ctrl,
      formGroup,
    )
  }

  selling() {
    return this._sellService.selling();
  }


  // .subscribe({
  //   next: (p: ProductDto) => {

  //     this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.form);
  //     this.form.value.subCategories = [];
  //     this._AlertsToastr.Notice(`Produto,  ${p.name}`, 0, 'success');
  //     this._Navigation.navigateByUrl('prodpagelist');
  //   },
  //   error: (error) => {
  //     alert('deu ruim')
  //     this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.form);
  //   },
  // });




  ngOnInit(): void {

    const tries = this._sellService.ModalService.config.initialState['list']['record'] as ProductDto
    sessionStorage.setItem('qts', tries.quantity.toString());
    this._sellService.formLoad();
    this._sellService.record = this._sellService.ModalService.config.initialState['list']['record'] as ProductDto;


  }

}
