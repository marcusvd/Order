
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


@Injectable({ providedIn: 'root' })
export class ProductService extends CrudService<ProductDto, number> {

  public formProductInsert: FormGroup;
  public pgnation: Pagination;
  public products: ProductDto[];

  constructor(
    override _Http: HttpClient,
    private _Fb: FormBuilder,
    public _ValidatorsSrv: ValidatorsService,
    private _AlertsToastr: AlertsToastr,
  ) { super(_Http, Url._PRODUCTS) }

  formControl = new FormControl('unitofmeasureid');

  formInsert() {
    this.formProductInsert = this._Fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      categoryid: ['', []],
      manufacturer: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      quantity: ['', [Validators.required]],
      capacity:['', []],
      price: ['', [Validators.required, Validators.minLength(1)]],
      cost: ['', [Validators.required, Validators.minLength(1)]],
      unitofmeasureid: ['', [Validators.required]],
      description: ['', [Validators.minLength(3), Validators.maxLength(500)]],
    })
  }

  loadCats(): Observable<CategoryDto[]> {
    return this._Http.get<CategoryDto[]>(Url._CATEGORIES).pipe(take(1));
  }
  // public _SubCat() {

  //   this.getById(this.formProductInsert.get('categoryid').value)
  //   this._Http.get<SubCategoryDto[]>(Url.)
  // }
  loadMeasures() {
    return this._Http.get<UnitOfMeasureDto[]>(Url._UNITOFMEASURES).pipe(take(1));
  }
  loadProducts() {
    // this._Http.get<ProductDto[]>(Url._PRODUCTS).pipe(take(1));
    return this.getAll<ProductDto[]>().pipe(take(1));
  }


  loadProductsPagination(pg?: number, record?: number): Observable<PaginatedResult<ProductDto[]>> {
    const paginatedResult: PaginatedResult<ProductDto[]> = new PaginatedResult<ProductDto[]>();

    let params = new HttpParams;
    if (pg != null && record != null) {
      params = params.append('pgnumber', pg.toString());
      params = params.append('pgsize', record.toString());
    }

    return this._Http.get<ProductDto[]>(Url._PRODUCTS, { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {

          paginatedResult.result = response.body;
          //  console.log('Body', this.products)
          //  console.log('Headers', this.pgnation)
          if (response.headers.has('pagination')) {

            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));

          }
          return paginatedResult;
        })
      );
  }


  save() {
    const toSave: ProductDto = { ...this.formProductInsert.value }



    console.log(toSave);
    //console.log(this.formProductInsert.value);


    this.add(toSave).subscribe((prod: ProductDto) => {
      console.log(prod);

      this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formProductInsert);
      this.formProductInsert.value.subCategories = [];
      this._AlertsToastr.Notice(`Produto,  ${toSave.name}`, 0, 'success');
    });


  }



}
