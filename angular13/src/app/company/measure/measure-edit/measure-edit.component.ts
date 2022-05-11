import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ValidatorsService } from '../../shared/services/validators.service';

import { MeasureEditService } from '../services/measure-edit.service';


@Component({
  selector: 'measure-edit',
  templateUrl: './measure-edit.component.html',
  styleUrls: ['./measure-edit.component.css']
})
export class MeasureEditComponent implements OnInit {
  constructor(
    private _MeaServices: MeasureEditService,
    private _ValidatorsSrv: ValidatorsService,

  ) { }

  doHide() {
    this._MeaServices.modalRef.hide();
  }

  update() {
    this._MeaServices.updateAsync();
  }

  get form(): FormGroup {
    return this._MeaServices.formInsert;
  }
  get name(): string {
    return this._MeaServices.name;
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
    this._MeaServices.MeasureDto = this._MeaServices.record;
    this._MeaServices.formLoad(this._MeaServices.MeasureDto);
  }

}
