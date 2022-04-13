import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { map, Observable, switchMap, take } from "rxjs";

import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";

import { Url } from "../../back-end/back-end";
import { CategoryDto } from "../../category/dto/category-dto";
import { UnitOfMeasureDto } from "../../measure/dto/unit-of-measure";
import { CrudService } from "../../shared/services/crud.service";
import { AlertsToastr } from "../../shared/services/alerts-toastr";
import { ValidatorsService } from "../../shared/services/validators.service";
import { ProductDto } from "../dto/product-dto";
import { SubCategoryDto } from "../../category/dto/sub-category-dto";


@Injectable({ providedIn: 'root' })
export class ProductEditService extends CrudService<ProductDto, number> {

  constructor(
    override _Http: HttpClient,
    private _Fb: FormBuilder,
    public _ValidatorsSrv: ValidatorsService,
    private _AlertsToastr: AlertsToastr,
  ) {
    super(_Http, Url._PRODUCTS);
  }

  measureArray: string[];
  storageArray: string[];
  formatArray: string[];
  stateArray: string[];
  categories: CategoryDto[] = [];
  subCat: SubCategoryDto[] = [];
  uOfMeasures: UnitOfMeasureDto[] = [];
  prod: ProductDto = new ProductDto();
  formProductEdit: FormGroup;
  height: string;
  width: string;
  depth: string;

  strHeightCompare: string;
  strWidthCompare: string;
  strDepthCompare: string;
  CategoryIdCompare: number;
  SubCategoryIdCompare: number;
  _idMeasure: number;
  prodToLoad: ProductDto = new ProductDto();


  loadProductToEdit(record: number) {
    return this._Http.get<ProductDto>(`${Url._PRODUCTS}/${record}`).pipe(take(1));
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
  loadCategories() {
    this.loadCats().subscribe((catDto: CategoryDto[]) => {
      this.categories = catDto
      catDto.forEach(_CatItem => {
        this.subCat = _CatItem.subCategories;
      })
    })
  }
  loadCats(): Observable<CategoryDto[]> {
    return this._Http.get<CategoryDto[]>(Url._CATEGORIES).pipe(take(1));
  }
  OnChangeCategory($event: any) {
    let ghy = this.categories.forEach((catId) => {
      if (catId.id == $event.target.value) {
        this.subCat = catId.subCategories;
      }
    })
  }
  OnChangeHeigth($event: any) {
    this.height = $event.target.value;
  }
  OnChangeWidth($event: any) {
    this.width = $event.target.value;
  }
  OnChangeDepth($event: any) {
    this.depth = $event.target.value;
  }
  loadCatById(id: number): Observable<CategoryDto> {
    return this._Http.get<CategoryDto>(`${Url._CATEGORIES}/${id}`).pipe(take(1));
  }
  loadMeasures() {
    return this._Http.get<UnitOfMeasureDto[]>(Url._UNITOFMEASURES).pipe(take(1));
  }
  productEditing(item: ProductDto) {
    this.measureArray.forEach((itemFor: string) => {
      if (itemFor.split('-')[1] === item.height.split('-')[1]) {
        this.strHeightCompare = itemFor
      }
    })
    this.measureArray.forEach((itemFor: string) => {
      if (itemFor.split('-')[1] === item.width.split('-')[1]) {
        this.strWidthCompare = itemFor
      }
    })
    this.measureArray.forEach((itemFor: string) => {
      if (itemFor.split('-')[1] === item.depth.split('-')[1]) {
        this.strDepthCompare = itemFor
      }
    })
    this.formProductEdit.patchValue({
      id: item.id,
      name: item.name,
      manufacturer: item.manufacturer,
      quantity: item.quantity,
      date: item.date,
      category: item.category,
      categoryId: item.categoryId,
      subCategory: item.subCategory,
      subCategoryId: item.subCategoryId,
      price: item.price,
      cost: item.cost,
      //dimensions
      height: item.height.split('(')[0].trim(),
      width: item.width.split('(')[0].trim(),
      depth: item.depth.split('(')[0].trim(),
      format: item.format,
      //state material
      state: item.state,
      storage: item.storage,
      maxstacked: item.maxstacked,
      unitOfMeasure: item.unitOfMeasure,
      unitOfMeasureId: item.unitOfMeasureId,
      weight: item.weight,
      description: item.description,
      comments: item.comments,
    });

    this.prodToLoad = { ...item }
    this.CategoryIdCompare = item.categoryId;
    this.SubCategoryIdCompare = item.subCategoryId;
    this.loadCatById(item.categoryId).subscribe({
      next: (_cat: CategoryDto) => {
        this.subCat = _cat.subCategories;
        console.log(_cat.subCategories)
      }
    });
    this.loadMeasures().subscribe((_un: UnitOfMeasureDto[]) => {
      this.uOfMeasures = [..._un]
      this.uOfMeasures.forEach((_unit: UnitOfMeasureDto) => {
        if (_unit.id === item.unitOfMeasureId) {
          this._idMeasure = _unit.id;
          console.log(_unit.id);
        }
      });
      const unit: UnitOfMeasureDto = new UnitOfMeasureDto();
      unit.name = 'Selecione';
      unit.description = 'Selecione';
      this.uOfMeasures.push(unit);
    });
  }
  updateProduct() {



    if (this.height === undefined) {
      this.height = '';
    }
    else {
      this.formProductEdit.value.height += ' ' + this.height
    }
    if (this.width === undefined) {
      this.width = '';
    }
    else {
      this.formProductEdit.value.width += ' ' + this.width
    }
    if (this.depth === undefined) {
      this.depth = '';
    }
    else {
      this.formProductEdit.value.depth += ' ' + this.depth
    }

    if (!this.formProductEdit.value.maxstacked) {
      this.formProductEdit.value.maxstacked = 0;
    }
    const toSave: ProductDto = { ...this.formProductEdit.value }
    console.log(toSave);
    this.update(toSave).subscribe({
      next: ((prod: ProductDto) => {
        console.log(prod);
        //this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formProductEdit);
        this.formProductEdit.value.subCategories = [];
        this._AlertsToastr.Notice(`Produto,  ${toSave.name}`, 0, 'success');
      }),
      error: (error) => {
        alert('deu ruim')
        this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formProductEdit);
      },
    });






    // const upd: ProductDto = { ...this.formProductEdit.value }

    // this.update<ProductDto>(upd).subscribe({
    //   next: (_p: ProductDto) => {
    //     console.log('Updated');
    //   },
    //   error: (_Err)=>{
    //     console.log(_Err);
    //   }

    // })


  }
}
