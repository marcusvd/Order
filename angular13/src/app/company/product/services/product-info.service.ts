import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { Url } from "../../back-end/back-end";

import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { MeasureDto } from "../../measure/dto/measure-dto";
import { CrudService } from "../../shared/services/crud.service";
import { ValidatorsService } from "../../shared/services/validators.service";
import { ProductDto } from "../dto/product-dto";



@Injectable({ providedIn: 'root' })
export class ProductInfoService extends CrudService<ProductDto, number> {

  constructor(
    override Http: HttpClient,
    public _ValidatorsSrv: ValidatorsService,
  ) {
    super(Http, Url._PRODUCTS);
  }

  categories: CategoryDto = new CategoryDto();
  uOfMeasures: MeasureDto = new  MeasureDto();

  prodToLoad: ProductDto = new ProductDto();

  loadCatById(id: number): Observable<CategoryDto> {
    return this.Http.get<CategoryDto>(`${Url._CATEGORIES}/${id}`).pipe(take(1));
  }
  loadUnitOfMeasureById(id: number): Observable<MeasureDto> {
    return this.Http.get<MeasureDto>(`${Url._UNITOFMEASURES}/${id}`).pipe(take(1));
  }


  productGetInfo(item: ProductDto) {

    let result: ProductDto = item;

    this.loadUnitOfMeasureById(result.measureId).subscribe({
      next: (_unit: MeasureDto) => {
        this.uOfMeasures = _unit;
        result.measure = _unit;
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
