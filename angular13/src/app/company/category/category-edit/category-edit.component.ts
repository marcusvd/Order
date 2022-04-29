import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryDto } from 'src/app/company/category/dto/category-dto';
import { ValidatorsService } from '../../shared/services/validators.service';
import { CategoryEditService } from '../services/category-edit.service';


@Component({
  selector: 'category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {


  constructor(
    private _CatEditServices: CategoryEditService,
    private _ValidatorsSrv: ValidatorsService,
    private _ModalService: BsModalService,
    private _ModalRef: BsModalRef,
  ) { }

  doHide() {
    this._ModalRef.hide();
  }

    get form(): FormGroup {
    return this._CatEditServices.formEdit;
  }
    get categoryId(): number {
    return this._CatEditServices.category.id;
  }
    get categoryName(): string {
    return this._CatEditServices.category.name;
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
    return <FormArray>this._CatEditServices.RetSubCatArrays;
  }
  update() {
    this._CatEditServices.updateAsync();
  }
  addSubCatArrays(categoryId: number) {
    this._CatEditServices.addSubCatArrays(categoryId);
  }
  removeSub(i: number) {
    this._CatEditServices.removeSub(i);
  }


  ngOnInit(): void {
    this._CatEditServices.formLoad(this._ModalService.config.initialState['list']['record'] as CategoryDto);
    this._CatEditServices.categoryLoad(this._ModalService.config.initialState['list']['record']);
  }

}
