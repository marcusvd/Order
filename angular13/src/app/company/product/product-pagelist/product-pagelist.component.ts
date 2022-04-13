import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ProductListService } from '../services/product-list.service';



@Component({
  selector: 'app-product-pagelist',
  templateUrl: './product-pagelist.component.html',
  styleUrls: ['./product-pagelist.component.css']
})
export class ProductPagelistComponent implements OnInit {


  constructor(
    public _RouteData: ActivatedRoute,
    public _ProductServices: ProductListService
  ) { }




  ngOnInit(): void {
    this._ProductServices.loadProductsToView();
  }

}
