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
import { Router } from "@angular/router";


@Injectable()
export class MeasureInsertService extends CrudService<UnitOfMeasureDto, number>{


  formInsert: FormGroup;


  constructor(
    override Http: HttpClient,
    private _Fb: FormBuilder,
    public _ValidatorsSrv: ValidatorsService,
    private _AlertsToastr: AlertsToastr,
    private ModalRef: BsModalRef,
    private ModalService: BsModalService,
    private Navigation: Router,
  ) {
    super(Http, Url._UNITOFMEASURES)
  }
  //tokenHeader = new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('usr')).token}` })
  //,{headers:this.tokenHeader}
  loadMeasures() {
    return this.Http.get<UnitOfMeasureDto[]>(Url._UNITOFMEASURES).pipe(map((cat) => cat), take(1));
  }

  public measureInsertShow: boolean = false;
  public measureShowHide() {
    this.measureInsertShow = !this.measureInsertShow;
  }



  toDelete(record: any) {
    record.who = 'measure'
    const initState: ModalOptions = {
      initialState: {
        list:  {record} ,
        title: 'Exclusão definitiva de registro.',
      },

    };
    this.ModalRef = this.ModalService.show(DeleteComponent, initState);
    this.ModalRef.content.closeBtnName = 'Close';
  }


  save() {

    const toSave: UnitOfMeasureDto = { ...this.formInsert.value }
    this.add(toSave).subscribe(() => {
      this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formInsert);
      this._AlertsToastr.Notice(`Unidade de medida, ${toSave.description}`, 0, 'success');
      this.measureInsertShow = false;
      this.Navigation.navigateByUrl('measureadm').then((item) => {
        if (!item) {
          this.Navigation.navigateByUrl('measureadmUpd');

        }
      });

    }, (error) => {
      this._AlertsToastr.Notice(`Unidade de medida, ${toSave.description}`, null, error, 'error');
    });
  }

  formLoad() {
    this.formInsert = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }





}
