import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { ValidatorsService } from '../../shared/services/validators.service';
import { CategoryInsertService } from '../services/category-insert.service';

@Component({
  selector: 'category-insert',
  templateUrl: './category-insert.component.html',
  styleUrls: ['./category-insert.component.css']
})
export class CategoryInsertComponent implements OnInit {

  constructor(
    private _CatService: CategoryInsertService,
    private _ValidatorsSrv: ValidatorsService,
  ) { }

  get form(): FormGroup {
    return this._CatService.formCategoryInsert
  }
  required(form: FormGroup, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {
    return this._ValidatorsSrv.required2(form,
      ctrl,
      ctrlToShow,
      lengthMin,
      lengthMax
    )
  }
  requiredArray(formArray: FormArray, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {
    return this._ValidatorsSrv.requiredArray(formArray,
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
  public touchedErrorsArray(formArray: FormArray, ctrl: string) {
    return this._ValidatorsSrv.touchedErrorsArray(formArray, ctrl);
  }
  get RetSubCatArrays(): FormArray {
    return <FormArray>this._CatService.RetSubCatArrays;
  }
  save() {
    this._CatService.save();
  }
  addSubCatArrays() {
    this._CatService.addSubCatArrays();
  }
  removeSub(i: number) {
    this._CatService.removeSub(i);
  }
  ngOnInit(): void {
    this._CatService.formLoad();
  }

}
