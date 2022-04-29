import { Component, OnInit } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryDto } from 'src/app/company/category/dto/category-dto';
import { ProductDto } from '../dto/product-dto';
import { ProductInfoService } from '../services/product-info.service';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {


  constructor(
    private _ProductServices: ProductInfoService,
    private _BsModalService: BsModalService,
    public ModalRef: BsModalRef
  ) { }

  prodInfo: ProductDto;
  _cat: CategoryDto;

  ngOnInit(): void {
    this.prodInfo = this._BsModalService.config.initialState['list']['record'] as ProductDto;
    this._ProductServices.productGetInfo(this.prodInfo);
  }

}
