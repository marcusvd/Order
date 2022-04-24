import { Component, OnInit } from '@angular/core';
import { MeasureDto } from 'src/app/company/measure/dto/measure-dto';
import { MeasureEditService } from '../services/measure-edit.service';
import { MeasureInsertService } from '../services/measure-insert.service';

@Component({
  selector: 'app-measure-adm',
  templateUrl: './measure-adm.component.html',
  styleUrls: ['./measure-adm.component.css']
})
export class MeasureAdmComponent implements OnInit {
  public Measures: MeasureDto[];
  constructor(
    public MeasureServices: MeasureInsertService,
    public MeasureEditServices: MeasureEditService
    ) { }





  ngOnInit(): void {
    this.MeasureServices.loadMeasures().subscribe((_measure: MeasureDto[]) => {
      this.Measures = _measure;
    })
  }

}
