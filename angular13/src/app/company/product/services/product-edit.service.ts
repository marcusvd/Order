import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, take } from "rxjs";

import { Url } from "../../back-end/back-end";
import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { ProductDto } from "../dto/product-dto";
import { SubCategoryDto } from "src/app/company/category/dto/sub-category-dto";
import { ProductEditDto } from "../dto/product-edit-dto";
import { UnitOfMeasureDto } from "../../measure/dto/unit-of-measure";
import { CrudService } from "../../shared/services/crud.service";
import { AlertsToastr } from "../../shared/services/alerts-toastr";

@Injectable({ providedIn: 'root' })
export class ProductEditService extends CrudService<ProductDto, number> {

  constructor(
    override Http: HttpClient,
    private _Fb: FormBuilder,
    private _AlertsToastr: AlertsToastr,
  ) {
    super(Http, Url._PRODUCTS);
  }

  measureArray: string[];
  storageArray: string[];
  storage: string;
  formatArray: string[];
  format: string;
  stateArray: string[];
  state: string;
  categories: CategoryDto[] = [];
  subCat: SubCategoryDto[] = [];
  uOfMeasures: UnitOfMeasureDto[] = [];
  prod: ProductEditDto = new ProductEditDto();
  formProductEdit: FormGroup;
  height: string;
  width: string;
  depth: string;
  strHeightCompare: string;
  strWidthCompare: string;
  strDepthCompare: string;
  CategoryIdCompare: number;
  SubCategoryIdCompare: number;
  MeasureIdCompare: number;
  prodToLoad: ProductEditDto = new ProductEditDto();

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
  loadCategories(cat: CategoryDto[]) {
    this.categories = cat
    cat.forEach(_CatItem => {
      this.subCat = _CatItem.subCategories;
    })
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
    return this.Http.get<CategoryDto>(`${Url._CATEGORIES}/${id}`).pipe(take(1));
  }
  productEditing(item: ProductEditDto, cat: CategoryDto[], mes: UnitOfMeasureDto[]) {

    this.loadCategories(cat);

    this.state = item.state
    this.storage = item.storage;
    this.format = item.format;

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
    cat.find((singleCat: CategoryDto) => {
      if (singleCat.id === item.categoryId) {
        this.subCat = singleCat.subCategories;
      }
    })
    this.uOfMeasures = mes;
    mes.forEach((_unit: UnitOfMeasureDto) => {
      if (_unit.id === item.unitOfMeasureId) {
        this.MeasureIdCompare = _unit.id;
      }
    })
    const unit: UnitOfMeasureDto = new UnitOfMeasureDto();
    unit.name = 'Selecione';
    unit.description = 'Selecione';
    mes.push(unit);
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
//if you dont chnage the date and update, will try to save as a string and it will generate some error, the code  below handler this.
   if(typeof(this.formProductEdit.value.date) === 'string'){
    const dateToSave: string = this.formProductEdit.value.date
    const month: string = dateToSave.slice(3, 5);
    const day: string = dateToSave.slice(0, 2);
    const year: string = dateToSave.slice(6, 10);
    const stringDate = year + '-' + month + '-' + day;
    toSave.date = new Date(Date.parse(stringDate))
   }


    this.update(toSave).subscribe({
      next: ((prod: ProductDto) => {
        console.log(prod);
        this.formProductEdit.value.subCategories = [];
        this._AlertsToastr.Notice(`Produto,  ${toSave.name}`, 0, 'success');
      }),
      error: (error) => {
        alert('deu ruim')

      },
    });
  }
}
