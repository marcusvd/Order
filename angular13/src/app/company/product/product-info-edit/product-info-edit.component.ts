import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { map, switchMap } from 'rxjs';
import { CategoryDto } from '../../category/dto/category-dto';
import { SubCategoryDto } from '../../category/dto/sub-category-dto';
import { UnitOfMeasureDto } from '../../measure/dto/unit-of-measure';
import { ProductDto } from '../dto/product-dto';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'product-edit',
  templateUrl: './product-info-edit.component.html',
  styleUrls: ['./product-info-edit.component.css'],
  providers: []
})
export class ProductInfoEditComponent implements OnInit {



  constructor(
    public _ProductService: ProductService,
    private _BsModalService: BsModalService,
    private _ActRoute: ActivatedRoute,
  ) { }


  strHeightCompare: string;
  strWidthCompare: string;
  strDepthCompare: string;

  prodToLoad: ProductDto = new ProductDto();
  ngOnInit(): void {




    this._ActRoute.params.pipe(map((params: any) => params['id']),
      switchMap(id => this._ProductService.loadProductToEdit(id))
    ).subscribe({
      next: (item: ProductDto) => {

        console.log(item.date)


        this._ProductService.measureArray.forEach((itemFor: string) => {
          if (itemFor.split('-')[1] === item.height.split('-')[1]) {
            this.strHeightCompare = itemFor
          }
        })
        this._ProductService.measureArray.forEach((itemFor: string) => {
          if (itemFor.split('-')[1] === item.width.split('-')[1]) {
            this.strWidthCompare = itemFor
          }
        })
        this._ProductService.measureArray.forEach((itemFor: string) => {
          if (itemFor.split('-')[1] === item.depth.split('-')[1]) {
            this.strDepthCompare = itemFor
          }
        })
        this._ProductService.formProductEdit.patchValue({
          id: item.id,
          name: item.name,
          manunfacture: item.manunfacture,
          quantity: item.quantity,
          date: item.date,
          category: item.category,
          categoryId: item.categoryId,
          subCategory: item.subCategory,
          subCategoryId: item.subCategoryId,
          price: item.price,
          cost: item.cost,
          //dimensions
          height: item.height.split('(')[0].trim(),
          width: item.width.split('(')[0].trim(),
          depth: item.depth.split('(')[0].trim(),
          format: item.format,
          //state material
          state: item.state,
          storage: item.storage,
          maxstacked: item.maxstacked,
          unitOfMeasure: item.unitOfMeasure,
          unitOfMeasureId: item.unitOfMeasureId,
          weight: item.weight,
          description: item.description,
          comments: item.comments,
        });
        this.prodToLoad = { ...item }

      }
    });

    this._ProductService.formEdit();

    this._ProductService.loadCategories();
    this._ProductService.loadMeasures().subscribe((item: UnitOfMeasureDto[]) => {
      this._ProductService.uOfMeasures = item
      const unit: UnitOfMeasureDto = new UnitOfMeasureDto();
      unit.name = 'Selecione';
      unit.description = 'Selecione';
      this._ProductService.uOfMeasures.push(unit);
    })
    this._ProductService.measureArray = [];
    this._ProductService.measureArray.push('(MM) - Milímetro(s)', '(CM) - Centímetro(s)', '(M) - Metro(s)');

    this._ProductService.storageArray = [];
    this._ProductService.storageArray.push('Empilhado(s)', 'Lado a lado', 'Empilhado(s) e lado a lado');

    this._ProductService.formatArray = [];
    this._ProductService.formatArray.push('Quadrada', 'Retangular', 'Cilindrica', 'Triangular', 'Linear', 'Hìbrido');

    this._ProductService.stateArray = [];
    this._ProductService.stateArray.push('Sólido', 'Líquido', 'Gasoso');



    this._ProductService.OnLoadCategory();



    // ;


  }

}












