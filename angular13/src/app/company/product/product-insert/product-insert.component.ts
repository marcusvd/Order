import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryDto } from '../../category/dto/category-dto';
import { SubCategoryDto } from '../../category/dto/sub-category-dto';
import { UnitOfMeasureDto } from '../../measure/dto/unit-of-measure';
import { ProductInsertService } from '../services/product-insert.service';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
  providers: []
})
export class ProductInsertComponent implements OnInit {

  constructor(
    public _ProductService: ProductInsertService
  ) { }

  ngOnInit(): void {
    this._ProductService.formInsert();
    this._ProductService.loadCategories();
    this._ProductService.loadSelects();
    this._ProductService.addSelectCat();
    this._ProductService.addSelectMeasure();
  }

}












