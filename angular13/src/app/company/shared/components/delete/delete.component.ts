import { UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private _AlertsToastr: AlertsToastr,
    private _Navigation: Router
  ) { }

  deleteRecord() {
    this._DeleteService.delete(this._DeleteService.record).subscribe({next: (item) => {
      this._AlertsToastr.Notice(this._DeleteService.record.name, 2, 'success');
      // this._Navigation.navigateByUrl('prodpagelist');
      this._Navigation.navigateByUrl('prodpagelistUpd').then((item)=>{
        if(!item){
          this._Navigation.navigateByUrl('prodpagelist');
        }
      });
      // this._Navigation.navigateByUrl('prodpagelist').then((item)=>{
      //   console.log(item);
      // });
    }}), erro => {
      this._AlertsToastr.Notice(`Erro, registro não foi deletado. ${this._DeleteService.record.name}`, null, 'error');
    };
  }
  deleteRecordCat() {
    this._DeleteService.toDeleteCat(this._DeleteService.record.id).subscribe({next: (item) => {
      this._AlertsToastr.Notice(this._DeleteService.record.name, 2, 'success');
      // this._Navigation.navigateByUrl('prodpagelist');
      this._Navigation.navigateByUrl('catadmUpd').then((item)=>{
        if(!item){
          this._Navigation.navigateByUrl('catadm');
        }
      });
      // this._Navigation.navigateByUrl('prodpagelist').then((item)=>{
      //   console.log(item);
      // });
    }}), erro => {
      this._AlertsToastr.Notice(`Erro, registro não foi deletado. ${this._DeleteService.record.name}`, null, 'error');
    };
  }




  ngOnInit(): void {
    this._DeleteService.record = this._BsModalService.config.initialState['list']['record'];
  }

}
