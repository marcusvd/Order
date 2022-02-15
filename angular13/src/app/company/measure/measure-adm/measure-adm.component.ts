import { Component, OnInit } from '@angular/core';
import { MeasureDto } from 'src/app/company/measure/dto/measure-dto';
import { MeasureService } from '../services/measure.service';

@Component({
  selector: 'app-measure-adm',
  templateUrl: './measure-adm.component.html',
  styleUrls: ['./measure-adm.component.css']
})
export class MeasureAdmComponent implements OnInit {
  public Measures: MeasureDto[];
  constructor(private _MeasureServices: MeasureService) { }

  ngOnInit(): void {
    this._MeasureServices.loadMeasures().subscribe((_measure: MeasureDto[]) => {
      this.Measures = _measure;

    })
  }

}
