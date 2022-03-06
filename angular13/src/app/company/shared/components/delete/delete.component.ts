import { UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertsToastr } from '../../services/alerts-toastr';
import { DeleteService } from './services/delete.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  closeBtnName?: string;
  constructor(
    public _BsModalRef: BsModalRef,
    public _BsModalService: BsModalService,
    public _DeleteService: DeleteService,
    private _AlertsToastr: AlertsToastr
  ) { }

  deleteRecord() {
    this._DeleteService.delete(this._DeleteService.record).subscribe(item => {
      this._AlertsToastr.Notice(this._DeleteService.record.name, 2, 'success');
    }, erro => {
      this._AlertsToastr.Notice(`Erro, registro não foi deletado. ${this._DeleteService.record.name}`, null, 'error');
    });
  }
  ngOnInit(): void {
    this._DeleteService.record = this._BsModalService.config.initialState['list']['record'];
  }

}
