import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { CrudService } from "../../shared/services/crud.service";
import { UnitOfMeasureDto } from "../dto/unit-of-measure";
import { ValidatorsService } from "../../shared/services/validators.service";
import { AlertsToastr } from "../../shared/services/alerts-toastr";
import { Url } from "../../back-end/back-end";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { MeasureDto } from "../dto/measure-dto";
import { MeasureEditComponent } from "../measure-edit/measure-edit.component";



@Injectable()
export class MeasureEditService extends CrudService<UnitOfMeasureDto, number>{

  UnitOfMeasureDto: UnitOfMeasureDto = new UnitOfMeasureDto();

  formInsert: FormGroup;

  constructor(
    override Http: HttpClient,
    private _Fb: FormBuilder,
    private _ValidatorsSrv: ValidatorsService,
    private _AlertsToastr: AlertsToastr,
    private _ModalRef: BsModalRef,
    private _ModalService: BsModalService,
    private _Navigation: Router,
  ) {
    super(Http, Url._UNITOFMEASURES)
  }

  get record(): MeasureDto {
    return this._ModalService.config.initialState['list']['record'] as MeasureDto;
  }
  get modalRef() {
    return this._ModalRef;
  }
  get name(): string {
    return this.UnitOfMeasureDto.name;
  }


  toEdit(record: MeasureDto) {
    const initState: ModalOptions = {
      initialState: {
        list: { record },
        title: 'Exclusão definitiva de registro.',
      },

    };
    this._ModalRef = this._ModalService.show(MeasureEditComponent, initState);
    this._ModalRef.content.closeBtnName = 'Close';
  }


  updateAsync() {
    const toSave: UnitOfMeasureDto = { ...this.formInsert.value }
    this.update<UnitOfMeasureDto>(toSave).subscribe({
      next: (unit: UnitOfMeasureDto) => {
        this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formInsert);
        this._AlertsToastr.Notice(`Unidade de medida, ${toSave.description}`, 1, 'success');
        this._Navigation.navigateByUrl('measureadm').then((item) => {
          if (!item) {
            this._Navigation.navigateByUrl('measureadmUpd');

          }
        });
      }
    }), (error: any) => {
      this._AlertsToastr.Notice(`Unidade de medida, ${toSave.description}`, null, error, 'error');
    }
  }

  formLoad(u: UnitOfMeasureDto) {
    this.formInsert = this._Fb.group({
      id: [u.id, [Validators.required]],
      name: [u.name, [Validators.required, Validators.maxLength(50)]],
      description: [u.description, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }





}
