import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CrudService } from "../../shared/services/crud.service";
import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { SubCategoryDto } from "../dto/sub-category-dto";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorsService } from "../../shared/services/validators.service";
import { Url } from "../../back-end/back-end";
import { Observable, take } from "rxjs";
import { AlertsToastr } from "../../shared/services/alerts-toastr";

@Injectable()
export class CategoryService extends CrudService<CategoryDto, number>{
  subCats: SubCategoryDto[] = [];
  private cat: SubCategoryDto;
  formCategoryInsert: FormGroup;
  subCatsFormGroup: FormGroup;
  charactersSub: number = 0;
  msg: boolean = null;

  public index: number = 0;

  constructor(
    override _Http: HttpClient,
    private _Fb: FormBuilder,
    public _ValidatorsSrv: ValidatorsService,
    public _AlertsToastr: AlertsToastr,
  ) {
    super(_Http, Url._CATEGORIES)
  }

  save() {
    // this.formCategoryInsert.value.subCategories = this.subCats;
    let toSave: CategoryDto = this.formCategoryInsert.value

    console.log(toSave);

    this.add(toSave).subscribe(() => {

      // this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formCategoryInsert);
      // this.formCategoryInsert.value.subCategories = [];
      this.RetSubCatArrays.clear();
      this.addSubCatArrays();
      this.formCategoryInsert.clearValidators();
      this.formCategoryInsert.reset();
      this.index =0;
      this._AlertsToastr.Notice(`Categoria,  ${toSave.name}`, 0, 'success');
    }, (error) => {
      this._AlertsToastr.Notice(`Categoria,  ${toSave.name}`, null, error, 'error');
    });


  }



  loadCats(): Observable<CategoryDto[]> {
    return this._Http.get<CategoryDto[]>(Url._CATEGORIES).pipe(take(1));
  }


  get RetSubCatArrays(): FormArray {
    return <FormArray>this.formCategoryInsert.controls['subcategories'];
  }
  public addSubCatArrays() {
    // this.OnBlur(val)
    this.RetSubCatArrays.push(this.subCatFormBuilder());
  }
  removeSub(ind: number): void {
    if (this.RetSubCatArrays.length > 1) {
      this.RetSubCatArrays.removeAt(ind)
      this.index--;
    }

    console.log()
  }
  subCatFormBuilder(): FormGroup {
    return this.subCatsFormGroup = this._Fb.group({
      // id: ['', []],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }
  checkField() {

    let val = <HTMLInputElement>document.getElementById((this.index).toString());
    // this.charactersSub = val.value.length;
    if (val.value.length > 3) {
      this.addSubCatArrays();
      this.index = 1 + this.index++;
    }
  }
  OnBlur(val) {
    return val.value.length > 3 ? this.msg = true : this.msg = false;
  }
  OnLoad(val) {
    return val.value.length === 0 ? this.msg = true : this.msg = false;
  }


  public formLoad() {
    this.formCategoryInsert = this._Fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      subcategories: this._Fb.array([this.subCatFormBuilder()])
    })
  }





}
