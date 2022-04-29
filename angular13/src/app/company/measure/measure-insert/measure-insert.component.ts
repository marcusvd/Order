import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorsService } from '../../shared/services/validators.service';

import { MeasureInsertService } from '../services/measure-insert.service';


@Component({
  selector: 'measure-insert',
  templateUrl: './measure-insert.component.html',
  styleUrls: ['./measure-insert.component.css']
})
export class MeasureInsertComponent implements OnInit {
  constructor(
    private _MeaServices: MeasureInsertService,
    private _ValidatorsSrv: ValidatorsService,
    ) { }

get form(): FormGroup{
return this._MeaServices.formInsert;
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

save(){
  this._MeaServices.save();
}

  ngOnInit(): void {
    this._MeaServices.formLoad();
  }

}
