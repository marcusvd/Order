import { UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteService } from './services/delete.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {


  constructor(
    public DeleteService: DeleteService,
    private modalRef: BsModalRef
  ) { }

  doHide() {
    this.modalRef.hide();
  }




  ngOnInit(): void {
    this.DeleteService.record = this.DeleteService.ModalService.config.initialState['list']['record'];
    console.log(typeof(this.DeleteService.record));
    console.log(this.DeleteService.record);
    }

}
