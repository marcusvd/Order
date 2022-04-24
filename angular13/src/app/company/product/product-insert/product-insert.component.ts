import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryDto } from 'src/app/company/category/dto/category-dto';
import { SubCategoryDto } from 'src/app/company/category/dto/sub-category-dto';
import { UnitOfMeasureDto } from '../../measure/dto/unit-of-measure';
import { ProductInsertService } from '../services/product-insert.service';

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












