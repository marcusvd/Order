import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map, of, switchMap, zip } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

import { Url } from "../../back-end/back-end";
import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { MeasureDto } from "../../measure/dto/measure-dto";
import { CrudService } from "../../shared/services/crud.service";
import { ProductDto } from "../dto/product-dto";

@Injectable()
export class ProductResolver extends CrudService<ProductDto, number> implements Resolve<{ cat: CategoryDto[], mes: MeasureDto[], prod: ProductDto }>{
  constructor(
    override Http: HttpClient,
    public _ActRoute: ActivatedRoute
  ) {
    super( Http, Url._PRODUCTS)
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ cat: CategoryDto[], mes: MeasureDto[], prod: ProductDto }> {
    const id: number = route.params['id'];
    var prod$ = this.getByIdAsync<ProductDto>(id);
    var cat$ = this.Http.get<CategoryDto[]>(Url._CATEGORIES);
    var mes$ = this.Http.get<MeasureDto[]>(Url._UNITOFMEASURES);
    var Return = zip(cat$, mes$, prod$).pipe(map(([cat, mes, prod]) => ({ cat, mes, prod })))
    return Return;

  }


}
