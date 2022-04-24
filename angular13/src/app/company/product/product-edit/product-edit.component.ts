import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { map, switchMap } from 'rxjs';
import { CategoryDto } from 'src/app/company/category/dto/category-dto';
import { SubCategoryDto } from 'src/app/company/category/dto/sub-category-dto';
import { UnitOfMeasureDto } from '../../measure/dto/unit-of-measure';
import { ProductDto } from '../dto/product-dto';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ProductEditService } from '../services/product-edit.service';
import { MeasureDto } from '../../measure/dto/measure-dto';
defineLocale('pt-br', ptBrLocale)
@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: []
})
export class ProductEditComponent implements OnInit {


  myRegion: string = 'pt-br';



  constructor(
    public _ProductService: ProductEditService,
    private _BsLocaleService: BsLocaleService,
    private _ActRoute: ActivatedRoute,
  ) {
    this._BsLocaleService.use(this.myRegion)
  }


  callToEdit() {
    this._ActRoute.data.subscribe({next:(item: any)=> {
      console.log(item.loaded['cat']);
      this._ProductService.productEditing
      (
      item.loaded['prod'] as ProductDto,
      item.loaded['cat'] as CategoryDto[],
      item.loaded['mse'] as UnitOfMeasureDto[]
      );
    }})




    // this._ActRoute.params.pipe(map((params: any) => params['id']),
    //   switchMap(id => this._ProductService.loadProductToEdit(id))
    // ).subscribe({
    //   next: (item: ProductDto) => {
    //     this._ProductService.productEditing(item);
    //   }
    // });
  }


  ngOnInit(): void {
    this._ProductService.loadSelects();
    this._ProductService.formEdit();

    this.callToEdit();

  }

}












