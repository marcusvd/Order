import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CategoryDto } from '../../category/dto/category-dto';
import { SubCategoryDto } from '../../category/dto/sub-category-dto';
import { MeasureDto } from '../../measure/dto/measure-dto';
import { ValidatorsService } from '../../shared/services/validators.service';
import { ProductInsertService } from '../services/product-insert.service';
defineLocale('pt-br', ptBrLocale)


@Component({
  selector: 'product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
  providers: []
})
export class ProductInsertComponent implements OnInit {
  myRegion: string = 'pt-br';
  constructor(
    private _ProductService: ProductInsertService,
    private _LocaleService: BsLocaleService,
    private _ValidatorsSrv: ValidatorsService,
  ) {
    this._LocaleService.use(this.myRegion);
  }

  OnChangeHeigth($event: any) {
    this._ProductService.height = $event.target.value;
  }
  OnChangeWidth($event: any) {
    this._ProductService.width = $event.target.value;
  }
  OnChangeDepth($event: any) {
    this._ProductService.depth = $event.target.value;
  }
  onChangeCategory($event): void {
    this._ProductService.OnChangeCategory($event)
  }
    get formProductInsert(): FormGroup {
    return this._ProductService.formProductInsert
  }
    get categories(): CategoryDto[] {
    return this._ProductService.categories;
  }
  get subCategories(): SubCategoryDto[] {
    return this._ProductService.subCat;
  }
  get Measures(): MeasureDto[] {
    return this._ProductService.uOfMeasures;
  }
  get measureStrArray(): string[] {
    return this._ProductService.measureArray;
  }
  get stateStrArray(): string[] {
    return this._ProductService.stateArray;
  }
  get storageStrArray(): string[] {
    return this._ProductService.storageArray;
  }
  get formatStrArray(): string[] {
    return this._ProductService.formatArray;
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

  save(): void {
    this._ProductService.save();
  }

  ngOnInit(): void {
    this._ProductService.formInsert();
    this._ProductService.loadCategories();
    this._ProductService.loadSelects();
    this._ProductService.addSelectCat();
    this._ProductService.addSelectMeasure();
  }

}












