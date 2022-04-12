

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
export class ProductService extends CrudService<ProductDto, number> {

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
  //#endregion

  //#region General
  public categories: CategoryDto[] = [];
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
    this.loadCats().subscribe((catDto: CategoryDto[]) => {
      this.categories = catDto
      catDto.forEach(_CatItem => {
       this.subCat = _CatItem.subCategories;
      })


    })
  }
  OnChangeCategory($event: any) {
    let ghy = this.categories.forEach((catId) => {
      if (catId.id == $event.target.value) {
        this.subCat = catId.subCategories;
      }
    })
  }
  OnLoadCategory() {
    this.loadCats().subscribe((item: CategoryDto[]) => {
      this.categories = item
      this.subCat = item
      let ghy = item.forEach((catId) => {

        this.subCat = catId.subCategories;
        console.log(this.subCat)

      })
    })
  }
  loadSelects() {
    this.measureArray = [];
    this.measureArray.push('(MM) - Milímetro(s)', '(CM) - Centímetro(s)', '(M) - Metro(s)');

    this.storageArray = [];
    this.storageArray.push('Empilhado(s)', 'Lado a lado', 'Empilhado(s) e lado a lado', 'Selecione');

    this.formatArray = [];
    this.formatArray.push('Quadrada', 'Retangular', 'Cilindrica', 'Triangular', 'Linear', 'Hìbrido', 'Selecione');

    this.stateArray = [];
    this.stateArray.push('Sólido', 'Líquido', 'Gasoso', 'Selecione');
   // this.OnLoadCategory();
  }

  addSelectMeasure() {
    this.loadMeasures().subscribe((item: UnitOfMeasureDto[]) => {
      this.uOfMeasures = item
      const unit: UnitOfMeasureDto = new UnitOfMeasureDto();
      unit.name = 'Selecione';
      unit.description = 'Selecione';
      this.uOfMeasures.push(unit);
    })
  }
  addSelectCat() {
    this.loadCats().subscribe((item: CategoryDto[]) => {
      this.categories = item
      const cat: CategoryDto = new CategoryDto();
      cat.name = 'Selecione';
      this.categories.push(cat);
    })
  }
  save() {
  }
  //#endregion
  //#region Edit
  public formProductEdit: FormGroup;
  prod: ProductDto = new ProductDto();

  loadProductToEdit(record: number) {
    return this._Http.get<ProductDto>(`${Url._PRODUCTS}/${record}`).pipe(take(1));
    //  .subscribe({
    //   next: (prodInclude: ProductDto) => {
    //     this.prod = { ...prodInclude }
    //   }
    // })

  }
  formEdit() {
    this.formProductEdit = this._Fb.group({
      id: ['', []],
      name: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      manufacturer: ['', [Validators.maxLength(150)]],
      quantity: ['', [Validators.required]],
      date: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
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

      unitOfMeasureId: ['', [Validators.required]],
      weight: ['', [Validators.maxLength(100000)]],
      description: ['', [Validators.maxLength(1000)]],
      comments: ['', [Validators.maxLength(1000)]]
    })
  }

  toEdit(record: ProductDto) {
    let prod: ProductDto = new ProductDto();
    prod = { ...record }
    this._Http.get<ProductDto>(`${Url._PRODUCTS}/${record.id}`).pipe(take(1))
      .subscribe({
        next: (prodInclude: ProductDto) => {
          prod = { ...prodInclude }
        }
      })

    const initState: ModalOptions = {
      initialState: {
        list: { prod },
        title: 'Exclusão definitiva de registro.'
      },
    };
    this.bsModalRef = this._BsModalService.show(ProductInfoEditComponent, initState);
    this.bsModalRef.content.closeBtnName = 'Close';
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

  loadCatById(id:number): Observable<CategoryDto> {
    return this._Http.get<CategoryDto>(`${Url._CATEGORIES}/${id}`).pipe(take(1));
  }

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
