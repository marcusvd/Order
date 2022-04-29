import { Component, OnInit } from '@angular/core';
import { MeasureDto } from 'src/app/company/measure/dto/measure-dto';
import { MeasureEditService } from '../services/measure-edit.service';
import { MeasureInsertService } from '../services/measure-insert.service';

@Component({
  selector: 'measure-list',
  templateUrl: './measure-list.component.html',
  styleUrls: ['./measure-list.component.css']
})
export class MeasureListComponent implements OnInit {
  public Measures: MeasureDto[];
  constructor(
    public _MeasureServices: MeasureInsertService,
    public _MeasureEditServices: MeasureEditService
    ) { }

    toDelete(record: any) {

      this._MeasureServices.toDelete(record);
    }

    toEdit(record: MeasureDto) {
      this._MeasureEditServices.toEdit(record);
    }

    measureInsertShow(){
      this._MeasureServices.measureInsertShow;
    }
    measureShowHide(){
      this._MeasureServices.measureShowHide;
    }

  ngOnInit(): void {
    this._MeasureServices.loadMeasures().subscribe((_measure: MeasureDto[]) => {
      this.Measures = _measure;
    })
  }

}
