import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, take } from "rxjs";
import { PaginatedResult, Pagination } from "../../shared/dto/pagination";
import { Url } from "../../back-end/back-end";

import { CrudService } from "../../shared/services/crud.service";
import { ProductDto } from "../dto/product-dto";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { DeleteComponent } from "../../shared/components/delete/delete.component";
import { ProductInfoComponent } from "../product-info/product-info.component";
import { NgxSpinnerService } from "ngx-spinner";
import { SellComponent } from "../../shared/components/sell/sell.component";
@Injectable({ providedIn: 'root' })
export class ProductListService extends CrudService<ProductDto, number> {

  constructor(
    override Http: HttpClient,
    private _BsModalService: BsModalService,
    private _Spinner: NgxSpinnerService
      ) {
    super(Http, Url._PRODUCTS);
  }

  bsModalRef?: BsModalRef;
  pagination = {} as Pagination;
  pgResulted: PaginatedResult<ProductDto[]>;
  products: ProductDto[] = [];

  pageChanged(e) {
    this.pagination.currentPg = e.page;
    this.loadProductsToView();
  }

sppinerStar(){
  this._Spinner.show();
}


  loadProductsToView() {
    this.loadProductsPagination(this.pagination.currentPg, this.pagination.itemsPerPg, '')
      .subscribe({
        next: (pagedResult: PaginatedResult<ProductDto[]>) => {
          this.pgResulted = pagedResult;
          this.pagination = pagedResult.pagination;
          this.products = pagedResult.result;
        },
        error: (error) => {
          console.log(error)
        },
        complete:()=>{
          this._Spinner.hide();
        }
      }
      )
  }

  loadProductByIdAsync(id: number): Observable<ProductDto> {
    return this.getByIdAsync<ProductDto>(id);
  }

  filterProducts(evt: any): void {
    this.loadProductsPagination
      (this.pagination.currentPg, this.pagination.itemsPerPg, evt.data)
      .subscribe({
        next: (pagedResult: PaginatedResult<ProductDto[]>) => {
          // this.pgResulted = pagedResult;
          console.log('method filter', evt)
          this.pagination = pagedResult.pagination
          this.products = pagedResult.result
        },
        error: (error) => console.log(error),
        complete: () => console.log(),
      })
  }

  loadProductsPagination(pg?: number, record?: number, terms?: string): Observable<PaginatedResult<ProductDto[]>> {
    const paginatedResult: PaginatedResult<ProductDto[]> = new PaginatedResult<ProductDto[]>();
    let params = new HttpParams;
    if (pg != null && record != null) {
      params = params.append('pgnumber', pg.toString());
      params = params.append('pgsize', record.toString());
    }

    if (terms !== null && terms !== '') {
      params = params.append('term', terms)
    }
    return this.Http.get<ProductDto[]>(Url._PRODUCTS, { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.has('pagination')) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  toSell(record: ProductDto) {
    const initState: ModalOptions = {
      initialState: {
        list: { record },
        title: 'Venda...',
      },

    };
    this.bsModalRef = this._BsModalService.show(SellComponent, initState);
    this.bsModalRef.content.closeBtnName = 'Close';


  }
  // toDelete(record: any) {
  //   record.who = 'product'
  //   const initState: ModalOptions = {
  //     initialState: {
  //       list: { record },
  //       title: 'Exclusão definitiva de registro.',
  //     },

  //   };
  //   this.bsModalRef = this._BsModalService.show(DeleteComponent, initState);
  //   this.bsModalRef.content.closeBtnName = 'Close';


  // }
  toInfo(record: ProductDto) {
    const initState: ModalOptions = {
      initialState: {
        list: { record },
        title: 'Exclusão definitiva de registro.',
      },

    };
    this.bsModalRef = this._BsModalService.show(ProductInfoComponent, initState);
    this.bsModalRef.content.closeBtnName = 'Close';


  }

}
