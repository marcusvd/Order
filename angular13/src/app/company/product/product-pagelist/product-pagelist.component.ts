import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


import { ProductDto } from '../dto/product-dto';
import { ProductListService } from '../services/product-list.service';



@Component({
  selector: 'app-product-pagelist',
  templateUrl: './product-pagelist.component.html',
  styleUrls: ['./product-pagelist.component.css']
})
export class ProductPagelistComponent implements OnInit {

  ebableDisableSell: boolean;

  constructor(
    private _ProductServices: ProductListService
  ) { }

  get products(): ProductDto[] {
    return this._ProductServices.products;
  }
  toSell(p: ProductDto) {
    this._ProductServices.toSell(p);
  }
  toDelete(p: ProductDto) {
    this._ProductServices.toDelete(p);
  }
  toCheckQts(p: number) {
    if (p === 0) {
      return this.ebableDisableSell = true;
    }
    else {
      return this.ebableDisableSell = false;
    }
  }
  toInfo(p: ProductDto) {
    this._ProductServices.toInfo(p);
  }
  pageChanged($event) {
    this._ProductServices.pageChanged($event);
  }
  filterProducts($event) {
    this._ProductServices.filterProducts($event);
  }
  get itemsPerPg(): number {
    return this._ProductServices.pagination.itemsPerPg;
  }
  get amountItems(): number {
    return this._ProductServices.pagination.amountItems;
  }

  get currentPg(): number {
    return this._ProductServices.pagination.currentPg;
  }

  ngOnInit(): void {
    this._ProductServices.sppinerStar();
    this._ProductServices.loadProductsToView();

  }

}
