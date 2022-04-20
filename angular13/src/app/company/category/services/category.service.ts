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
export class CategoryService extends CrudService<CategoryDto, number>{
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


  //#region insertShow

 public catInsertShow: boolean = false;
public catShowHide(){
  this.catInsertShow = !this.catInsertShow;
}


  //#endregion


  //#region Edit
  valLength: string = '';



  //#endregion'




  constructor(
    override _Http: HttpClient,
    private _Fb: FormBuilder,
    public _ValidatorsSrv: ValidatorsService,
    public _AlertsToastr: AlertsToastr,
    private _BsModalService: BsModalService

  ) {
    super(_Http, Url._CATEGORIES)
  }

  bsModalRef: BsModalRef;


  toDelete(record: CategoryDto) {
    const initState: ModalOptions = {
      initialState: {
        list: { record },
        title: 'Exclusão definitiva de registro.',
      },

    };
    this.bsModalRef = this._BsModalService.show(DeleteComponent, initState);
    this.bsModalRef.content.closeBtnName = 'Close';


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
    if (this.RetSubCat === 'edit') {
      //    console.log('Categoria edit');
      return <FormArray>this.formCategoryEdit.controls['subcategories'];
    }
    //console.log('Categoria insert');
    return <FormArray>this.formCategoryInsert.controls['subcategories'];
  }





  public addSubCatArrays() {
    if (this.RetSubCat === 'edit') {
      this.RetSubCatArrays.push(this.subCatFormBuilderEdit());
    }
    if (this.RetSubCat === 'insert') {
      this.RetSubCatArrays.push(this.subCatFormBuilder());
    }
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



  OnBlur(val) {

    //#region edit

    console.log(this.valLength)
    //#endregion
    return val.value.length > 3 ? this.msg = true : this.msg = false;
  }
  OnLoad(val) {
    return val.value.length === 0 ? this.msg = true : this.msg = false;
  }

  subCatFormBuilder(): FormGroup {
    return this.subCatsFormGroup = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]]
    })
  }

  public formLoad() {
    this.RetSubCat = 'insert';
    this.formCategoryInsert = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      subcategories: this._Fb.array([this.subCatFormBuilder()])
    })
  }

  // #region Edit
  subCatFormBuilderEdit(): FormGroup {
    return this.subCatsEditFormGroup = this._Fb.group({
      id: ['', []],
      name: ['', [Validators.required, Validators.maxLength(50)]]
    })
  }

  public formLoadEdit() {
    this.RetSubCat = 'edit';
    this.formCategoryEdit = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      subcategories: this._Fb.array([this.subCatFormBuilderEdit()])
    })
  }
  changeValue(val: any) {
    this.valLength = val.value;

    console.log(val.value)
    // if (val.length > 2) {
    //   this._CatServices.addSubCatArrays();
    //   this._CatServices.index = 1 + this._CatServices.index++;
    // }
  }


  checkField() {
    console.log('SIZE' + this.valLength.length)
    if (this.valLength.length > 2) {
      this.addSubCatArrays();
      this.index = 1 + this.index++;
    }
  }
  //#endregion
}
