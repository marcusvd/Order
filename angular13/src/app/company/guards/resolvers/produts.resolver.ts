import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductDto } from '../../product/dto/product-dto';
import { ProductService } from '../../product/services/product-service';
import { PaginatedResult, Pagination } from '../../shared/dto/pagination';

@Injectable({
  providedIn: 'root'
})


export class ProdutsResolver implements Resolve<Observable<PaginatedResult<ProductDto[]>>> {

  public pagination = {} as Pagination;

  constructor(private _ProductServices: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<ProductDto[]>> {

    this.pagination = <Pagination>{ currentPg: 1, itemsPerPg: 3, amountItems: 1 };

    return this._ProductServices.loadProductsPagination(this.pagination.currentPg, this.pagination.itemsPerPg);

  }
}
