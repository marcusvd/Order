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

  formCategoryEdit: FormGroup;
  subCatsEditFormGroup: FormGroup;
  bsModalRef: BsModalRef;
  category: CategoryDto;


  constructor(
    override Http: HttpClient,
    private Fb: FormBuilder,
    private ModalService: BsModalService,
    public ValidatorsSrv: ValidatorsService,
    public AlertsToastr: AlertsToastr,
    private Navigation: Router,


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
    this.bsModalRef = this.ModalService.show(CategoryEditComponent, initState);
    this.bsModalRef.content.closeBtnName = 'Close';


  }

  seedForm(sub: SubCategoryDto[]) {
    sub?.forEach((sub: SubCategoryDto) => {
      return this.RetSubCatArrays.push(this.Fb.group(sub));
    })

  }

  public formLoad(cat: CategoryDto) {
    this.formCategoryEdit = this.Fb.group({
      id: [cat.id, [Validators.required]],
      name: [cat.name, [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      subCategories: this.Fb.array([])
    })
    this.seedForm(cat.subCategories);
  }

  subCatFormBuilder(categoryId: number): FormGroup {
    return this.Fb.group({
      name: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      categoryId:[categoryId, [Validators.required]],
    })
  }


  get RetSubCatArrays(): FormArray {
    return <FormArray>this.formCategoryEdit.controls['subCategories'];
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

    const toSave: CategoryDto = { ...this.formCategoryEdit.value }

    console.log(toSave);

    this.update<CategoryDto>(toSave).subscribe({
      next: (unit: CategoryDto) => {
        this.ValidatorsSrv.cleanAfters(['contact', 'address'], this.formCategoryEdit);
        this.AlertsToastr.Notice(`Categoria, ${toSave.name}`, 1, 'success');

        this.Navigation.navigateByUrl('catlist').then((item) => {
          if (!item) {
            this.Navigation.navigateByUrl('catUpd');

          }
        });
      }
    }), (error: any) => {
      this.AlertsToastr.Notice(`Categoria, ${toSave.name}`, null, error, 'error');
    }
  }


  // save() {

  //   let toSave: CategoryDto = this.formCategoryEdit.value
  //   console.log(toSave);
  //   this.update<CategoryDto>(toSave).subscribe(() => {
  //     // this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formCategoryEdit);
  //     // this.formCategoryEdit.value.subCategories = [];
  //     this.RetSubCatArrays?.clear();
  //     this.addSubCatArrays();
  //     this.formCategoryEdit.clearValidators();
  //     this.formCategoryEdit.reset();
  //     this.AlertsToastr.Notice(`Categoria,  ${toSave.name}`, 0, 'success');
  //   }, (error) => {
  //     this.AlertsToastr.Notice(`Categoria,  ${toSave.name}`, null, error, 'error');
  //   });
  // }


}
