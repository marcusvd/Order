import { Component, OnInit } from '@angular/core';

import { MeasureService } from '../services/measure.service';


@Component({
  selector: 'measure-insert',
  templateUrl: './measure-insert.component.html',
  styleUrls: ['./measure-insert.component.css']
})
export class MeasureInsertComponent implements OnInit {
  constructor(public _MeaServices: MeasureService ) { }

  ngOnInit(): void {

    this._MeaServices.formLoad();

  }

}
