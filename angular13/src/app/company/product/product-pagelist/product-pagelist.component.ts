import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { PaginatedResult, Pagination } from '../../shared/dto/pagination';
import { ProductDto } from '../dto/product-dto';
import { ProductListService } from '../services/product-list.service';
import { ProductService } from '../services/product-service';


@Component({
  selector: 'app-product-pagelist',
  templateUrl: './product-pagelist.component.html',
  styleUrls: ['./product-pagelist.component.css']
})
export class ProductPagelistComponent implements OnInit {


  constructor(
    public _ProductService: ProductService,
    public _RouteData: ActivatedRoute,
    public _ProductServices: ProductListService
  ) { }




  ngOnInit(): void {
    this._ProductService.loadProductsToView();
  }

}
