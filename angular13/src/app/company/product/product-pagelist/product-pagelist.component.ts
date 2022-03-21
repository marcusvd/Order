import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginatedResult, Pagination } from '../../shared/dto/pagination';
import { ProductDto } from '../dto/product-dto';
import { ProductService } from '../services/product-service';


@Component({
  selector: 'app-product-pagelist',
  templateUrl: './product-pagelist.component.html',
  styleUrls: ['./product-pagelist.component.css']
})
export class ProductPagelistComponent implements OnInit {
  public pagination = {} as Pagination;
  public pgResulted: PaginatedResult<ProductDto[]>;
  public products: ProductDto[] = [];
  //  Array<ProductDto>();



  public pageChanged(e) {
    this.pagination.currentPg = e.page;
    console.log(this.pagination.currentPg);
    this.loadProducts();
  }


  displayedColumns = ['name', 'price']
  constructor(
    public _ProductService: ProductService,
    public _RouteData: ActivatedRoute,
    public _ProductServices: ProductService
  ) { }

private loadProducts(){
 // this.pagination = <Pagination>{ currentPg: 1, itemsPerPg: 3, amountItems: 1 };

 this._ProductServices.loadProductsPagination(this.pagination.currentPg, this.pagination.itemsPerPg)
 .subscribe(item => {
  this.pgResulted = item;
  this.pagination= item.pagination;
  this.products = item.result
 });


}



  ngOnInit(): void {
    this.loadProducts();
  }

}
