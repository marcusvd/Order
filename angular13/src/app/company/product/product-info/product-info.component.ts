import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map, switchMap } from 'rxjs';
import { CategoryDto } from '../../category/dto/category-dto';
import { ProductDto } from '../dto/product-dto';

import { ProductListService } from '../services/product-list.service';



@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {


  constructor(
    private _ProductServices: ProductListService,
    private _ActRouter: ActivatedRoute,
    private _BsModalService: BsModalService,
   public _ModalRef: BsModalRef
  ) { }

  prodInfo: ProductDto;
  _cat: CategoryDto;

  // loadProductById() {
  //   this._ActRouter.params.pipe(map((params: any) => params['id']),


  //     switchMap(id => this._ProductServices.loadProductByIdAsync(id))).subscribe({
  //       next: (prod: ProductDto) => {
  //         this.prodInfo = new ProductDto();
  //         this.prodInfo = prod;
  //         console.log(prod)
  //       },
  //       error: (err) => {

  //       }
  //     })
  //   {

  //   }
  // }





  ngOnInit(): void {
    this.prodInfo = this._BsModalService.config.initialState['list']['record'] as ProductDto;

    //this._ProductServices.lo
    //this._ProductServices.loadProductsToView();
    // this.loadProductById();
  }

}
