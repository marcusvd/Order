import { UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductDto } from 'src/app/company/product/dto/product-dto';
import { SellService } from './services/sell.service';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
import { FormGroup } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {


  constructor(
    private _sellService: SellService,
    private _modalRef: BsModalRef,
    private _ValidatorsSrv: ValidatorsService,
  ) {registerLocaleData(localeBr, 'br'); }

  doHide() {
    this._modalRef.hide();
  }

  get getRecord(){
    return this._sellService.getRecord;
  }


  get form(): FormGroup{
    return this._sellService.formGet;
  }

  get pay(): string[]{
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

  ngOnInit(): void {
    this._sellService.record = this._sellService.ModalService.config.initialState['list']['record'] as ProductDto;
    this._sellService.formLoad();


    }

}
