import { FormBuilder, FormGroup} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";

import { CrudService } from "../../shared/services/crud.service";
import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { SubCategoryDto } from "src/app/company/category/dto/sub-category-dto";
import { ValidatorsService } from "../../shared/services/validators.service";
import { Url } from "../../back-end/back-end";
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

  private _catInsertShow: boolean = false;
  public catShowHide() {
    this._catInsertShow = !this._catInsertShow;
  }
  constructor(
    override Http: HttpClient,
    private _ModalService: BsModalService

  ) {
    super(Http, Url._CATEGORIES)
  }

  private _bsModalRef: BsModalRef;

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
    this._bsModalRef = this._ModalService.show(DeleteComponent, initState);
    this._bsModalRef.content.closeBtnName = 'Close';
  }
  toInfo(record: CategoryDto) {
    const initState: ModalOptions = {
      initialState: {
        list: { record },
        title: 'Exclusão definitiva de registro.',
      },

    };
    this._bsModalRef = this._ModalService.show(CategoryInfoComponent, initState);
    this._bsModalRef.content.closeBtnName = 'Close';


  }
  loadCats(): Observable<CategoryDto[]> {
    return this.Http.get<CategoryDto[]>(Url._CATEGORIES).pipe(take(1));
  }

}
