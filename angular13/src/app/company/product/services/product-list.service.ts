

import { HttpClient, HttpParams, JsonpClientBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { map, Observable, take } from "rxjs";
import { PaginatedResult, Pagination } from "../../shared/dto/pagination";
import { Url } from "../../back-end/back-end";
import { CategoryDto } from "../../category/dto/category-dto";
import { UnitOfMeasureDto } from "../../measure/dto/unit-of-measure";
import { CrudService } from "../../shared/services/crud.service";
import { AlertsToastr } from "../../shared/services/alerts-toastr";
import { ValidatorsService } from "../../shared/services/validators.service";
import { ProductDto } from "../dto/product-dto";
import { ProductModule } from "../modules/product.module";
import { ProductInsertComponent } from "../product-insert/product-insert.component";
import { SubCategoryDto } from "../../category/dto/sub-category-dto";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { DeleteComponent } from "../../shared/components/delete/delete.component";
import { ProductInfoEditComponent } from "../product-info-edit/product-info-edit.component";
import { MeasureDto } from "../../measure/dto/measure-dto";

@Injectable({ providedIn: 'root' })
export class ProductListService extends CrudService<ProductDto, number> {

  constructor(
    override _Http: HttpClient,
    private _Fb: FormBuilder,
    public _ValidatorsSrv: ValidatorsService,
    private _AlertsToastr: AlertsToastr,
    private _BsModalService: BsModalService
  ) {
    super(_Http, Url._PRODUCTS);
  }

  bsModalRef?: BsModalRef;

  //#region LoadPagination
  public pagination = {} as Pagination;
  public pgResulted: PaginatedResult<ProductDto[]>;
  public products: ProductDto[] = [];

  public pageChanged(e) {
    this.pagination.currentPg = e.page;
    this.loadProductsToView();
  }

  public loadProductsToView() {
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
        // complete:(comp)=>
      })
  }

  public filterProducts(evt: any): void {
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
    return this._Http.get<ProductDto[]>(Url._PRODUCTS, { observe: 'response', params })
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
  //#endregion


  //#region Delete
  toDelete(record: ProductDto) {
    const initState: ModalOptions = {
      initialState: {
        list: { record },
        title: 'Exclusão definitiva de registro.',
      },

    };
    this.bsModalRef = this._BsModalService.show(DeleteComponent, initState);
    this.bsModalRef.content.closeBtnName = 'Close';


  }
  //#endregion



}
