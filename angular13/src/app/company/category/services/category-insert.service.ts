import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, take } from "rxjs";

import { CrudService } from "../../shared/services/crud.service";
import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { SubCategoryDto } from "src/app/company/category/dto/sub-category-dto";
import { ValidatorsService } from "../../shared/services/validators.service";
import { Url } from "../../back-end/back-end";
import { AlertsToastr } from "../../shared/services/alerts-toastr";
@Injectable()
export class CategoryInsertService extends CrudService<CategoryDto, number>{
  subCats: SubCategoryDto[] = [];
  private cat: SubCategoryDto;
  formCategoryInsert: FormGroup;
  formCategoryEdit: FormGroup;
  subCatsFormGroup: FormGroup;
  subCatsEditFormGroup: FormGroup;
  charactersSub: number = 0;
  msg: boolean = null;
  RetSubCat: string = 'insert';
  public index: number = 0;

  valLength: string = '';

  constructor(
    override Http: HttpClient,
    private _Fb: FormBuilder,
    public _ValidatorsSrv: ValidatorsService,
    public _AlertsToastr: AlertsToastr,
    public Router: Router,

  ) {
    super(Http, Url._CATEGORIES)
  }


  save() {
    const toSave: CategoryDto = this.formCategoryInsert.value
    this.add(toSave).subscribe(() => {
      this.RetSubCatArrays.clear();
      this.formCategoryInsert.clearValidators();
      this.formCategoryInsert.reset();
      this.index = 0;
      this._AlertsToastr.Notice(`Categoria,  ${toSave.name}`, 0, 'success');
      window.location.reload();
    }, (error) => {
      this._AlertsToastr.Notice(`Categoria,  ${toSave.name}`, null, error, 'error');
    });
  }
  loadCats(): Observable<CategoryDto[]> {
    return this.Http.get<CategoryDto[]>(Url._CATEGORIES).pipe(take(1));
  }
  get RetSubCatArrays(): FormArray {
    return <FormArray>this.formCategoryInsert.controls['subcategories'];
  }
  public addSubCatArrays() {
    this.RetSubCatArrays.push(this.subCatFormBuilder());
  }
  removeSub(ind: number): void {
    if (this.RetSubCatArrays.length > 1) {
      this.RetSubCatArrays.removeAt(ind)
      this.index--;
    }

  }
  subCatFormBuilder(): FormGroup {
    return this.subCatsFormGroup = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3)]]
    })
  }
  public formLoad() {
    this.formCategoryInsert = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      subcategories: this._Fb.array([this.subCatFormBuilder()])
    })
  }
}
