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
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { DeleteComponent } from "../../shared/components/delete/delete.component";

@Injectable()
export class CategoryEditService extends CrudService<CategoryDto, number>{
  // subCats: SubCategoryDto[] = [];
  // private cat: SubCategoryDto;
   public categories: CategoryDto[] = [];
  // formCategoryInsert: FormGroup;
   formCategoryEdit: FormGroup;
  // subCatsFormGroup: FormGroup;
   subCatsEditFormGroup: FormGroup;
  // charactersSub: number = 0;
  // msg: boolean = null;
  // RetSubCat: string = 'insert';
   public index: number = 0;




  constructor(
    override _Http: HttpClient,
    private _Fb: FormBuilder,
    public _ValidatorsSrv: ValidatorsService,
    public _AlertsToastr: AlertsToastr

  ) {
    super(_Http, Url._CATEGORIES)
  }



  save() {
    // this.formCategoryInsert.value.subCategories = this.subCats;
    let toSave: CategoryDto = this.formCategoryEdit.value
    console.log(toSave);
    this.add(toSave).subscribe(() => {
      // this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formCategoryEdit);
      // this.formCategoryEdit.value.subCategories = [];
      this.RetSubCatArrays.clear();
      this.addSubCatArrays();
      this.formCategoryEdit.clearValidators();
      this.formCategoryEdit.reset();
      this.index = 0;
      this._AlertsToastr.Notice(`Categoria,  ${toSave.name}`, 0, 'success');
    }, (error) => {
      this._AlertsToastr.Notice(`Categoria,  ${toSave.name}`, null, error, 'error');
    });
  }

  loadCats(): Observable<CategoryDto[]> {
    return this._Http.get<CategoryDto[]>(Url._CATEGORIES).pipe(take(1));
  }

  get RetSubCatArrays(): FormArray {
    return <FormArray>this.formCategoryEdit.controls['subcategories'];
  }
  public addSubCatArrays() {
    this.RetSubCatArrays.push(this.subCatFormBuilderEdit());
  }
  removeSub(ind: number): void {
    if (this.RetSubCatArrays.length > 1) {
      this.RetSubCatArrays.removeAt(ind)
      this.index--;
    }
  }
  subCatFormBuilderEdit(): FormGroup {
    return this.subCatsEditFormGroup = this._Fb.group({
      id: ['', []],
      name: ['', [Validators.required, Validators.maxLength(50)]]
    })
  }

  public formLoadEdit() {
    this.formCategoryEdit = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      subcategories: this._Fb.array([this.subCatFormBuilderEdit()])
    })
  }







}
