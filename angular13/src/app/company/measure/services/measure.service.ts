import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Injectable } from "@angular/core";

import { CrudService } from "../../shared/services/crud.service";
import { UnitOfMeasureDto } from "../dto/unit-of-measure";
import { ValidatorsService } from "../../shared/services/validators.service";
import { AlertsToastr } from "../../shared/services/alerts-toastr";
import { Url } from "../../back-end/back-end";
import { map, take } from "rxjs";
import { SubCategoryDto } from "../../category/dto/sub-category-dto";
import { CategoryDto } from "../../category/dto/category-dto";


@Injectable()
export class MeasureService extends CrudService<UnitOfMeasureDto, number>{


  formInsert: FormGroup;


  constructor(
    override _Http: HttpClient,
    private _Fb: FormBuilder,
    public _ValidatorsSrv: ValidatorsService,
    private _AlertsToastr: AlertsToastr
  ) {
    super(_Http, Url._UNITOFMEASURES)
  }
 //tokenHeader = new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('usr')).token}` })
 //,{headers:this.tokenHeader}
  loadMeasures() {
    return this._Http.get<UnitOfMeasureDto[]>(Url._UNITOFMEASURES).pipe(map((cat) => cat), take(1));
  }

  save() {

    const toSave: UnitOfMeasureDto = { ...this.formInsert.value }
    this.add(toSave).subscribe(() => {
      this._ValidatorsSrv.cleanAfters(['contact', 'address'], this.formInsert);
      this._AlertsToastr.Notice(`Unidade de medida, ${toSave.description}`, 0, 'success');
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
