import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CrudService } from "../../shared/services/crud.service";
import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { SubCategoryDto } from "src/app/company/category/dto/sub-category-dto";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorsService } from "../../shared/services/validators.service";
import { Url } from "../../back-end/back-end";
import { Observable, take } from "rxjs";
import { AlertsToastr } from "../../shared/services/alerts-toastr";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { DeleteComponent } from "../../shared/components/delete/delete.component";
import { ActivatedRoute, Router } from "@angular/router";

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

  //#region Edit
  valLength: string = '';



  //#endregion'




  constructor(
    override Http: HttpClient,
    private _Fb: FormBuilder,
    public _ValidatorsSrv: ValidatorsService,
    public _AlertsToastr: AlertsToastr,
    public Router:Router,

  ) {
    super(Http, Url._CATEGORIES)
  }


  save() {
    // this.formCategoryInsert.value.subCategories = this.subCats;
    let toSave: CategoryDto = this.formCategoryInsert.value

    console.log(toSave);

    this.add(toSave).subscribe(() => {

      // this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formCategoryInsert);
      // this.formCategoryInsert.value.subCategories = [];
      this.RetSubCatArrays.clear();
      // this.addSubCatArrays();
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
    //console.log('Categoria insert');
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

  // checkField() {


  //   console.log((<HTMLInputElement>document.getElementById('0')).value)

  //   let val = (<HTMLInputElement>document.getElementById(this.index.toString()))
  //    console.log((<HTMLInputElement>document.getElementById(this.index.toString())).id)

  //          console.log('TESTE', val.value.length)
  //   //  this.charactersSub = val.value.length;
  //   if (val.value.length > 2) {
  //     this.addSubCatArrays();
  //     this.index = 1 + this.index++;
  //   }
  // }



  // OnBlur(val) {

  //  //#region edit

  //   console.log(this.valLength)
  //   //#endregion
  //   return val.value.length > 3 ? this.msg = true : this.msg = false;
  // }
  // OnLoad(val) {
  //   return val.value.length === 0 ? this.msg = true : this.msg = false;
  // }

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



  //#endregion
}
