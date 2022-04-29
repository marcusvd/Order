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
import { CategoryInfoComponent } from "../category-info/category-info.component";

@Injectable()
export class CategoryListService extends CrudService<CategoryDto, number>{
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

  private _catInsertShow: boolean = false;
  public catShowHide() {
    this._catInsertShow = !this._catInsertShow;
  }



  constructor(
    override Http: HttpClient,
    private Fb: FormBuilder,
    public ValidatorsSrv: ValidatorsService,
    public AlertsToastr: AlertsToastr,
    private ModalService: BsModalService

  ) {
    super(Http, Url._CATEGORIES)
  }

  bsModalRef: BsModalRef;

  get catInsertShow(): boolean {
    return this._catInsertShow;
  }

  toDelete(record: any) {
    record.who = 'category'
    const initState: ModalOptions = {
      initialState: {
        list: { record },
        title: 'Exclusão definitiva de registro.',
      },

    };
    this.bsModalRef = this.ModalService.show(DeleteComponent, initState);
    this.bsModalRef.content.closeBtnName = 'Close';


  }

  toInfo(record: CategoryDto) {
    const initState: ModalOptions = {
      initialState: {
        list: { record },
        title: 'Exclusão definitiva de registro.',
      },

    };
    this.bsModalRef = this.ModalService.show(CategoryInfoComponent, initState);
    this.bsModalRef.content.closeBtnName = 'Close';


  }



  loadCats(): Observable<CategoryDto[]> {
    return this.Http.get<CategoryDto[]>(Url._CATEGORIES).pipe(take(1));
  }

}
