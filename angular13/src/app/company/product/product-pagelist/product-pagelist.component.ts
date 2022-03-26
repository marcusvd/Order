import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { empty, Observable } from 'rxjs';
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

  constructor(
    public _ProductService: ProductService,
    public _RouteData: ActivatedRoute,
    public _ProductServices: ProductService
  ) { }

  public pageChanged(e) {
    this.pagination.currentPg = e.page;
    this.loadProducts();
  }

  private loadProducts() {
   const test: string = '';

    this._ProductServices.loadProductsPagination(this.pagination.currentPg, this.pagination.itemsPerPg, test)
      .subscribe((pagedResult: PaginatedResult<ProductDto[]>) => {
        this.pgResulted = pagedResult;
        this.pagination = pagedResult.pagination;
        this.products = pagedResult.result;
      }, (error) => {
        console.log(error)
      })
  }

  public filterProducts(evt: any): void {
    this._ProductServices.loadProductsPagination
      (this.pagination.currentPg, this.pagination.itemsPerPg, evt.data)
      .subscribe({
        next: (pagedResult: PaginatedResult<ProductDto[]>) => {
          // this.pgResulted = pagedResult;
          console.log('method filter', evt)
          this.pagination = pagedResult.pagination
          this.products = pagedResult.result
        },
        error: (error) => console.log(error),
        complete: () => console.log(),
      })

  }


  //  => {

  //
  //   ;
  //




  ngOnInit(): void {
    this.loadProducts();
  }

}
