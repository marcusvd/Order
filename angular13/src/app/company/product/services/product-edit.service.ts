import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, take } from "rxjs";

import { Url } from "../../back-end/back-end";
import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { ProductDto } from "../dto/product-dto";
import { SubCategoryDto } from "src/app/company/category/dto/sub-category-dto";
import { ProductEditDto } from "../dto/product-edit-dto";
import { MeasureDto } from "../../measure/dto/measure-dto";
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

  categories: CategoryDto[] = [];
  subCat: SubCategoryDto[] = [];
  measures: MeasureDto[];
  prod: ProductEditDto = new ProductEditDto();
  formProductEdit: FormGroup;
  categoryIdCompare: number;
 subCategoryIdCompare: number;
  measureIdCompare: number;
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

      measureId: ['', [Validators.required]],
      weight: ['', [Validators.maxLength(100000)]],
      description: ['', [Validators.maxLength(1000)]],
      barCode: ['', [Validators.maxLength(1000)]]
    })
  }

  loadCategories(cat: CategoryDto[]) {
    this.categories = cat
    cat.forEach(_CatItem => {
      this.subCat = _CatItem.subCategories;
      console.log(this.subCat)
    })
  }
  OnChangeCategory($event: any) {
    let ghy = this.categories.forEach((catId) => {
      if (catId.id == $event.target.value) {
        this.subCat = catId.subCategories;
      }
    })
  }

  loadCatById(id: number): Observable<CategoryDto> {
    return this.Http.get<CategoryDto>(`${Url._CATEGORIES}/${id}`).pipe(take(1));
  }
  productEditing(item: ProductEditDto, cat: CategoryDto[], mes: MeasureDto[]) {


    this.loadCategories(cat);

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

      measure: item.measure,
      measureId: item.measureId,
      weight: item.weight,
      description: item.description,
      barCode: item.barCode,
    });

    this.prodToLoad = { ...item }
    this.categoryIdCompare = item.categoryId;
    this.subCategoryIdCompare = item.subCategoryId;
    cat.find((singleCat: CategoryDto) => {
      if (singleCat.id === item.categoryId) {
        this.subCat = singleCat.subCategories;
      }
    })

    this.measures = [];
    this.measures = mes;

console.log(item.measureId)
    mes.forEach((_unit: MeasureDto) => {
      if (_unit.id === item.measureId) {
        this.measureIdCompare = _unit.id;
      }
    })
    // const unit: MeasureDto = new MeasureDto();
    // unit.name = 'Selecione';
    // unit.description = 'Selecione';
    // mes.push(unit);
  }
  updateProduct() {

    const toSave: ProductDto = { ...this.formProductEdit.value }
    //if you dont chnage the date and update, will try to save as a string and it will generate some error, the code  below handler this.
    if (typeof (this.formProductEdit.value.date) === 'string') {
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
