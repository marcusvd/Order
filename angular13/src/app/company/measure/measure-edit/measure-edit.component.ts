import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { MeasureEditService } from '../services/measure-edit.service';


@Component({
  selector: 'measure-edit',
  templateUrl: './measure-edit.component.html',
  styleUrls: ['./measure-edit.component.css']
})
export class MeasureEditComponent implements OnInit {
  constructor(
    public MeaServices: MeasureEditService,


    ) { }





  doHide() {
    this.MeaServices.ModalRef.hide();
  }





  ngOnInit(): void {

    this.MeaServices.UnitOfMeasureDto = this.MeaServices.ModalService.config.initialState['list']['record'];
    this.MeaServices.formLoad(this.MeaServices.UnitOfMeasureDto);

  }

}
