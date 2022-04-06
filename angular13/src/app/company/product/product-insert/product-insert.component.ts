import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryDto } from '../../category/dto/category-dto';
import { SubCategoryDto } from '../../category/dto/sub-category-dto';
import { UnitOfMeasureDto } from '../../measure/dto/unit-of-measure';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
  providers: []
})
export class ProductInsertComponent implements OnInit {



  constructor(
    public _ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this._ProductService.formInsert();
    this._ProductService.loadCategories();
    this._ProductService.loadMeasures().subscribe((item: UnitOfMeasureDto[]) => {
      this._ProductService.uOfMeasures = item
    })
    this._ProductService.measureArray = [];
    this._ProductService.measureArray.push('(MM) - Milímetro(s)', '(CM) - Centímetro(s)', '(M) - Metro(s)');

    this._ProductService.storageArray = [];
    this._ProductService.storageArray.push('Empilhado(s)', 'Lado a lado', 'Empilhado(s) e lado a lado');

    this._ProductService.formatArray = [];
    this._ProductService.formatArray.push('Quadrada', 'Retangular', 'Cilindrica', 'Triangular', 'Linear', 'Hìbrido');

    this._ProductService.stateArray = [];
    this._ProductService.stateArray.push('Sólido', 'Líquido', 'Gasoso');
  }

}
