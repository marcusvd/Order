import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, take } from "rxjs";
import { Url } from "../../back-end/back-end";
import { CategoryDto } from "../../category/dto/category-dto";
import { UnitOfMeasureDto } from "../../measure/dto/unit-of-measure";
import { CrudService } from "../../shared/services/crud.service";
import { AlertsToastr } from "../../shared/services/alerts-toastr";
import { ValidatorsService } from "../../shared/services/validators.service";
import { ProductDto } from "../dto/product-dto";
import { SubCategoryDto } from "../../category/dto/sub-category-dto";
import { MeasureDto } from "../../measure/dto/measure-dto";


@Injectable({ providedIn: 'root' })
export class ProductInfoService extends CrudService<ProductDto, number> {

  constructor(
    override _Http: HttpClient,
    private _Fb: FormBuilder,
    public _ValidatorsSrv: ValidatorsService,
    private _AlertsToastr: AlertsToastr,
  ) {
    super(_Http, Url._PRODUCTS);
  }
  // subCat: SubCategoryDto[] = [];
  categories: CategoryDto = new CategoryDto();
  uOfMeasures: UnitOfMeasureDto = new  UnitOfMeasureDto();

  // measureArray: string[];
  // storageArray: string[];
  // storage: string;
  // formatArray: string[];
  // format: string;
  // stateArray: string[];
  // state: string;
  // prod: ProductDto = new ProductDto();
  // formProductEdit: FormGroup;
  // height: string;
  // width: string;
  // depth: string;

  // strHeightCompare: string;
  // strWidthCompare: string;
  // strDepthCompare: string;
  // CategoryIdCompare: number;
  // SubCategoryIdCompare: number;
  // _idMeasure: number;
  prodToLoad: ProductDto = new ProductDto();

  loadCatById(id: number): Observable<CategoryDto> {
    return this._Http.get<CategoryDto>(`${Url._CATEGORIES}/${id}`).pipe(take(1));
  }
  loadUnitOfMeasureById(id: number): Observable<UnitOfMeasureDto> {
    return this._Http.get<UnitOfMeasureDto>(`${Url._UNITOFMEASURES}/${id}`).pipe(take(1));
  }


  productGetInfo(item: ProductDto) {

    let result: ProductDto = item;

    this.loadUnitOfMeasureById(result.unitOfMeasureId).subscribe({
      next: (_unit: UnitOfMeasureDto) => {
        this.uOfMeasures = _unit;
        result.unitOfMeasure = _unit;
        console.log(this.uOfMeasures);
      }, error: (err) => {
        console.log(err);
      }
    })

    this.loadCatById(result.categoryId).subscribe({
      next: (_cat: CategoryDto) => {
        result.category = _cat
      }
      , error: (err) => {
        console.log(err);
      }
    });



  }
}
