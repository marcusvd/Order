

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
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { ProductInfoEditComponent } from "../product-info-edit/product-info-edit.component";
import { MeasureDto } from "../../measure/dto/measure-dto";

@Injectable({ providedIn: 'root' })
export class ProductInsertService extends CrudService<ProductDto, number> {

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

  //#region Create Insert
  public category: CategoryDto[] = [];
  public uOfMeasures: UnitOfMeasureDto[] = [];
  public uom: UnitOfMeasureDto;
  public cat: CategoryDto;
  public subCat: SubCategoryDto[] = [];
  public formProductInsert: FormGroup;
  selectedCat: number;
  measureArray: string[];
  storageArray: string[];
  formatArray: string[];
  stateArray: string[];
  height: string;
  width: string;
  depth: string;

  OnChangeHeigth($event: any) {
    this.height = $event.target.value;
  }
  OnChangeWidth($event: any) {
    this.width = $event.target.value;
  }
  OnChangeDepth($event: any) {
    this.depth = $event.target.value;
  }
  loadCategories() {
    this.loadCats().subscribe((item: CategoryDto[]) => {
      this.category = item
    })
  }
  OnChangeCategory($event: any) {
    let ghy = this.category.forEach((catId) => {
      if (catId.id == $event.target.value) {
        this.subCat = catId.subCategories;
      }
    })
  }

loadSelects(){
  this.measureArray = [];
  this.measureArray.push('(MM) - Milímetro(s)', '(CM) - Centímetro(s)', '(M) - Metro(s)');

  this.storageArray = [];
  this.storageArray.push('Empilhado(s)', 'Lado a lado', 'Empilhado(s) e lado a lado', 'Selecione');

  this.formatArray = [];
  this.formatArray.push('Quadrada', 'Retangular', 'Cilindrica', 'Triangular', 'Linear', 'Hìbrido', 'Selecione');

  this.stateArray = [];
  this.stateArray.push('Sólido', 'Líquido', 'Gasoso', 'Selecione');
}

addSelectMeasure()
{
  this.loadMeasures().subscribe((item: UnitOfMeasureDto[]) => {
    this.uOfMeasures = item
    const unit: UnitOfMeasureDto = new UnitOfMeasureDto();
    unit.name = 'Selecione';
    unit.description = 'Selecione';
    this.uOfMeasures.push(unit);
  })
}
addSelectCat()
{
  this.loadCats().subscribe((item: CategoryDto[]) => {
    this.category = item
    const cat: CategoryDto = new CategoryDto();
    cat.name = 'Selecione';
    this.category.push(cat);
  })
}

formInsert() {
    this.formProductInsert = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      manufacturer: ['', [Validators.maxLength(150)]],
      quantity: ['', [Validators.required]],
      date: ['', [Validators.required]],
      CategoryId: ['', [Validators.required]],
      subCategoryId: ['', [Validators.required]],

      price: ['', [Validators.required]],
      cost: ['', [Validators.required]],

      height: ['', [Validators.maxLength(25)]],
      width: ['', [Validators.maxLength(25)]],
      depth: ['', [Validators.maxLength(25)]],
      format: ['', [Validators.maxLength(150)]],

      state: ['', [Validators.maxLength(30)]],
      storage: ['', [Validators.maxLength(30)]],
      maxstacked: ['', [Validators.maxLength(100000)]],

      unitofmeasureId: ['', [Validators.required]],
      weight: ['', [Validators.maxLength(100000)]],
      description: ['', [Validators.maxLength(1000)]],
      comments: ['', [Validators.maxLength(1000)]]
    })
  }

  save() {

    if (this.height === undefined) {
      this.height = '';
    }
    else {
      this.formProductInsert.value.height += ' ' + this.height
    }
    if (this.width === undefined) {
      this.width = '';
    }
    else {
      this.formProductInsert.value.width += ' ' + this.width
    }
    if (this.depth === undefined) {
      this.depth = '';
    }
    else {
      this.formProductInsert.value.depth += ' ' + this.depth
    }

    // this.formProductInsert.value.storage = 'undefined';
    // this.formProductInsert.value.state = 'undefined';
    // this.formProductInsert.value.format = 'undefined';
    // this.formProductInsert.value.shape = 'undefined';


    if (!this.formProductInsert.value.maxstacked) {
      this.formProductInsert.value.maxstacked = 0;
    }
    const toSave: ProductDto = { ...this.formProductInsert.value }
    console.log(toSave);
    this.add(toSave).subscribe({
      next: ((prod: ProductDto) => {
        console.log(prod);
        this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formProductInsert);
        this.formProductInsert.value.subCategories = [];
        this._AlertsToastr.Notice(`Produto,  ${toSave.name}`, 0, 'success');
      }),
      error: (error) => {
        alert('deu ruim')
        this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formProductInsert);
      },
    });


  }
  //#endregion

  loadCats(): Observable<CategoryDto[]> {
    return this._Http.get<CategoryDto[]>(Url._CATEGORIES).pipe(take(1));
  }
  loadMeasures() {
    return this._Http.get<UnitOfMeasureDto[]>(Url._UNITOFMEASURES).pipe(take(1));
  }
  loadProducts() {
    // this._Http.get<ProductDto[]>(Url._PRODUCTS).pipe(take(1));
    return this.getAll<ProductDto[]>().pipe(take(1));
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
          //  console.log('Body', this.products)
          //  console.log('Headers', this.pgnation)
          if (response.headers.has('pagination')) {

            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));

          }
          return paginatedResult;
        })
      );
  }




}
