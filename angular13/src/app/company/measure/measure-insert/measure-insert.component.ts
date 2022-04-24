import { Component, OnInit } from '@angular/core';

import { MeasureInsertService } from '../services/measure-insert.service';


@Component({
  selector: 'measure-insert',
  templateUrl: './measure-insert.component.html',
  styleUrls: ['./measure-insert.component.css']
})
export class MeasureInsertComponent implements OnInit {
  constructor(public MeaServices: MeasureInsertService ) { }

  ngOnInit(): void {

    this.MeaServices.formLoad();

  }

}
