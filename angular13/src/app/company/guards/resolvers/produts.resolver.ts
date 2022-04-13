import { Injectable } from '@angular/core';
import { Resolve,  RouterStateSnapshot,  ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductDto } from '../../product/dto/product-dto';
import { ProductListService } from '../../product/services/product-list.service';
import { PaginatedResult, Pagination } from '../../shared/dto/pagination';

@Injectable({
  providedIn: 'root'
})

export class ProdutsResolver implements Resolve<Observable<PaginatedResult<ProductDto[]>>> {

  public pagination = {} as Pagination;

  constructor(private _ProductServices: ProductListService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<ProductDto[]>> {

    this.pagination = <Pagination>{ currentPg: 1, itemsPerPg: 3, amountItems: 1 };

    return this._ProductServices.loadProductsPagination(this.pagination.currentPg, this.pagination.itemsPerPg);

  }
}
