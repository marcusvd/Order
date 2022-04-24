import { Component, Input, OnInit } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryDto } from 'src/app/company/category/dto/category-dto';
import { CategoryEditService } from '../services/category-edit.service';


@Component({
  selector: 'category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {


  constructor(
    public CatEditServices: CategoryEditService,
    private _ModalService: BsModalService,
    private _ModalRef: BsModalRef,
  ) { }

  doHide() {
    this._ModalRef.hide();
  }

  ngOnInit(): void {
    this.CatEditServices.formLoad(this._ModalService.config.initialState['list']['record'] as CategoryDto);
    this.CatEditServices.category = this._ModalService.config.initialState['list']['record'];
  }

}
