import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { map, switchMap } from 'rxjs';
import { CategoryDto } from '../../category/dto/category-dto';
import { SubCategoryDto } from '../../category/dto/sub-category-dto';
import { UnitOfMeasureDto } from '../../measure/dto/unit-of-measure';
import { ProductDto } from '../dto/product-dto';
import { ProductService } from '../services/product-service';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
defineLocale('pt-br', ptBrLocale)
@Component({
  selector: 'product-edit',
  templateUrl: './product-info-edit.component.html',
  styleUrls: ['./product-info-edit.component.css'],
  providers: []
})
export class ProductInfoEditComponent implements OnInit {


  myRegion: string = 'pt-br';
  _idMeasure: number;

  constructor(
    public _ProductService: ProductService,
    private _BsLocaleService: BsLocaleService,
    private _ActRoute: ActivatedRoute,
  ) {
    this._BsLocaleService.use(this.myRegion)
  }


  strHeightCompare: string;
  strWidthCompare: string;
  strDepthCompare: string;

  CategoryIdCompare: number;
  SubCategoryIdCompare: number;

  prodToLoad: ProductDto = new ProductDto();

  callToEdit() {

    this._ActRoute.params.pipe(map((params: any) => params['id']),
      switchMap(id => this._ProductService.loadProductToEdit(id))
    ).subscribe({
      next: (item: ProductDto) => {

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
          manufacturer: item.manufacturer,
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
        this.CategoryIdCompare = item.categoryId;
        this.SubCategoryIdCompare = item.subCategoryId;

        this._ProductService.loadCatById(item.categoryId).subscribe({
          next: (_cat: CategoryDto) => {
            this._ProductService.subCat = _cat.subCategories;
            console.log(_cat.subCategories)
          }
        })

        this._ProductService.loadMeasures().subscribe((_un: UnitOfMeasureDto[]) => {
          this._ProductService.uOfMeasures = [..._un]

          this._ProductService.uOfMeasures.forEach((_unit: UnitOfMeasureDto) => {

            if (_unit.id === item.unitOfMeasureId) {
              this._idMeasure = _unit.id;
              console.log(_unit.id);
            }

          })

        const unit: UnitOfMeasureDto = new UnitOfMeasureDto();
        unit.name = 'Selecione';
        unit.description = 'Selecione';
        this._ProductService.uOfMeasures.push(unit);

      })


  }
});



  }

// reload() {
//  let numbersToTry = 0;
//   numbersToTry += 1;
//   if (numbersToTry == 1) {
//     window.location.reload();
//   }

// }



ngOnInit(): void {

  this.callToEdit();

  this._ProductService.formEdit();

  this._ProductService.loadCategories();

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












