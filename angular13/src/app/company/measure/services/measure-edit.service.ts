import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Injectable } from "@angular/core";

import { CrudService } from "../../shared/services/crud.service";
import { UnitOfMeasureDto } from "../dto/unit-of-measure";
import { ValidatorsService } from "../../shared/services/validators.service";
import { AlertsToastr } from "../../shared/services/alerts-toastr";
import { Url } from "../../back-end/back-end";
import { map, take } from "rxjs";
import { CategoryDto } from "../../category/dto/category-dto";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { DeleteComponent } from "../../shared/components/delete/delete.component";
import { MeasureDto } from "../dto/measure-dto";
import { MeasureEditComponent } from "../measure-edit/measure-edit.component";
import { Router } from "@angular/router";



@Injectable()
export class MeasureEditService extends CrudService<UnitOfMeasureDto, number>{

  UnitOfMeasureDto: UnitOfMeasureDto = new UnitOfMeasureDto();

  formInsert: FormGroup;


  constructor(
    override Http: HttpClient,
    private Fb: FormBuilder,
    public ValidatorsSrv: ValidatorsService,
    private AlertsToastr: AlertsToastr,
    public ModalRef: BsModalRef,
    public ModalService: BsModalService,
    private Navigation: Router,
  ) {
    super(Http, Url._UNITOFMEASURES)
  }


  toEdit(record: MeasureDto) {
    const initState: ModalOptions = {
      initialState: {
        list: { record },
        title: 'Exclusão definitiva de registro.',
      },

    };
    this.ModalRef = this.ModalService.show(MeasureEditComponent, initState);
    this.ModalRef.content.closeBtnName = 'Close';


  }


  updateAsync() {

    const toSave: UnitOfMeasureDto = { ...this.formInsert.value }
    this.update<UnitOfMeasureDto>(toSave).subscribe({
      next: (unit: UnitOfMeasureDto) => {
        this.ValidatorsSrv.cleanAfters(['contact', 'address'], this.formInsert);
        this.AlertsToastr.Notice(`Unidade de medida, ${toSave.description}`, 1, 'success');
        this.Navigation.navigateByUrl('measureadm').then((item) => {
          if (!item) {
            this.Navigation.navigateByUrl('measureadmUpd');

          }
        });
      }
    }), (error: any) => {
      this.AlertsToastr.Notice(`Unidade de medida, ${toSave.description}`, null, error, 'error');
    }
  }

    formLoad(u: UnitOfMeasureDto) {
      this.formInsert = this.Fb.group({
        id: [u.id, [Validators.required]],
        name: [u.name, [Validators.required, Validators.maxLength(50)]],
        description: [u.description, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
      })
    }





  }
