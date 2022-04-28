import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';


import { CategoryDto } from 'src/app/company/category/dto/category-dto';
import { UnitOfMeasureDto } from '../../measure/dto/unit-of-measure';
import { ProductDto } from '../dto/product-dto';
import { ProductEditService } from '../services/product-edit.service';
import { ProductEditDto } from '../dto/product-edit-dto';
import { FormGroup } from '@angular/forms';
import { SubCategoryDto } from '../../category/dto/sub-category-dto';
import { MeasureDto } from '../../measure/dto/measure-dto';
import { ValidatorsService } from '../../shared/services/validators.service';

defineLocale('pt-br', ptBrLocale)

@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: []
})
export class ProductEditComponent implements OnInit {

  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  myRegion: string = 'pt-br';

  constructor(
    private _ProductService: ProductEditService,
    private _ValidatorsSrv: ValidatorsService,
    private _BsLocaleService: BsLocaleService,
    private _ActRoute: ActivatedRoute,
  ) {
    moment.locale(this.myRegion);
    this._BsLocaleService.use(this.myRegion);
    this.dpConfig.containerClass = 'theme-green';
    this.dpConfig.useUtc = true;
    this.dpConfig.dateInputFormat = 'DD-MM-YYYY';
  }

  get form(): FormGroup {
    return this._ProductService.formProductEdit
  }
  get categories(): CategoryDto[] {
    return this._ProductService.categories;
  }
  get SubCategories(): SubCategoryDto[] {
    return this._ProductService.subCat;
  }
  get Measures(): MeasureDto[] {
    return this._ProductService.uOfMeasures;
  }
  Required(form: FormGroup, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {
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
  update(): void {
    this._ProductService.updateProduct();
  }
  get compareCat(): number {
    return this._ProductService.CategoryIdCompare;
  }
  get compareSub(): number {
    return this._ProductService.SubCategoryIdCompare;
  }
  get formatStrArray(): string[] {
    return this._ProductService.formatArray;
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
  get formatStr(): string {
    return this._ProductService.format;
  }
  get storageStr(): string {
    return this._ProductService.storage;
  }
  get stateStr(): string {
    return this._ProductService.state;
  }
  get strHeightCompare(): string {
    return this._ProductService.strHeightCompare;
  }
  get strWidthCompare(): string {
    return this._ProductService.strWidthCompare;
  }
  get strDepthCompare(): string {
    return this._ProductService.strDepthCompare;
  }
  get compareMes(): number {
    return this._ProductService.MeasureIdCompare;
  }
  callToEdit() {
    let p: ProductEditDto;
    this._ActRoute.data.subscribe({
      next: (item: any) => {
        p = new ProductEditDto();
        p = item.loaded['prod'] as ProductEditDto
        let datePtBr = moment(p.date).format("DD-MM-YYYY");
        p.date = datePtBr;
        this._ProductService.productEditing
          (
            p,
            item.loaded['cat'] as CategoryDto[],
            item.loaded['mse'] as UnitOfMeasureDto[]
          );
      }
    })
  }
  ngOnInit(): void {
    this._ProductService.loadSelects();
    this._ProductService.formEdit();
    this.callToEdit();
  }
}












