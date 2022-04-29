import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CrudService } from "../../shared/services/crud.service";
import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorsService } from "../../shared/services/validators.service";
import { Url } from "../../back-end/back-end";
import { AlertsToastr } from "../../shared/services/alerts-toastr";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { CategoryEditComponent } from "../category-edit/category-edit.component";
import { DeleteComponent } from "../../shared/components/delete/delete.component";
import { SubCategoryDto } from "src/app/company/category/dto/sub-category-dto";
import { Router } from "@angular/router";


@Injectable()
export class CategoryEditService extends CrudService<CategoryDto, number>{

  private _formCategoryEdit: FormGroup;
  private _bsModalRef: BsModalRef;
  private _category: CategoryDto;


  constructor(
    override Http: HttpClient,
    private _Fb: FormBuilder,
    private _ValidatorsSrv: ValidatorsService,
    private _AlertsToastr: AlertsToastr,
    private _Navigation: Router,
    private _ModalService: BsModalService
  ) {
    super(Http, Url._CATEGORIES)
  }

  toEdit(record: CategoryDto) {
    const initState: ModalOptions = {
      initialState: {
        list: { record },
        title: 'Exclusão definitiva de registro.',
      },

    };
    this._bsModalRef = this._ModalService.show(CategoryEditComponent, initState);
    this._bsModalRef.content.closeBtnName = 'Close';
  }

  seedForm(sub: SubCategoryDto[]) {
    sub?.forEach((sub: SubCategoryDto) => {
      return this.RetSubCatArrays.push(this._Fb.group(sub));
    })

  }

  public formLoad(cat: CategoryDto) {
    this._formCategoryEdit = this._Fb.group({
      id: [cat.id, [Validators.required]],
      name: [cat.name, [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      subCategories: this._Fb.array([])
    })
    this.seedForm(cat.subCategories);
  }

  subCatFormBuilder(categoryId: number): FormGroup {
    return this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      categoryId: [categoryId, [Validators.required]],
    })
  }


  get RetSubCatArrays(): FormArray {
    return <FormArray>this._formCategoryEdit.controls['subCategories'];
  }
  get formEdit(): FormGroup {
    return this._formCategoryEdit;
  }
  get category(): CategoryDto {
    return this._category;
  }

  public categoryLoad(c: CategoryDto) {
      this._category = c;
  }
  public addSubCatArrays(categoryId: number) {
    this.RetSubCatArrays?.push(this.subCatFormBuilder(categoryId));
  }

  removeSub(ind: number): void {
    if (this.RetSubCatArrays?.length > 1) {
      this.RetSubCatArrays?.removeAt(ind)
    }
  }

  updateAsync() {
    const toSave: CategoryDto = { ...this._formCategoryEdit.value }
    this.update<CategoryDto>(toSave).subscribe({
      next: (unit: CategoryDto) => {
        this._ValidatorsSrv.cleanAfters(['contact', 'address'], this._formCategoryEdit);
        this._AlertsToastr.Notice(`Categoria, ${toSave.name}`, 1, 'success');

        this._Navigation.navigateByUrl('catlist').then((item) => {
          if (!item) {
            this._Navigation.navigateByUrl('catUpd');

          }
        });
      }
    }), (error: any) => {
      this._AlertsToastr.Notice(`Categoria, ${toSave.name}`, null, error, 'error');
    }
  }

}
