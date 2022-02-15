import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginatedResult, Pagination } from '../../shared/dto/pagination';
import { ProductDto } from '../dto/product-dto';
import { ProductRoutingModule } from '../modules/product-routing.module';
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



  currentPage;
  public pageChanged(e) {
    this.pagination.currentPg = e.page;
    this.loadProducts();
  }


  displayedColumns = ['name', 'price']
  constructor(
    public _ProductService: ProductService,
    public _RouteData: ActivatedRoute
  ) { }

  private loadProducts() {
    this.pgResulted = { ... this._RouteData.snapshot.data['loaded'] };
    // this.products = [];
    this.products = this._RouteData.snapshot.data['loaded'].result;
    console.log(this._RouteData.snapshot.data['loaded'].result);


    // this._RouteData.data.subscribe((item: PaginatedResult<ProductDto[]>) => {
    //   this.products = loaded.result
    //   console.log(loaded)
    // });



    // this.pagination = <Pagination>{ currentPg: 1, itemsPerPg: 3, amountItems: 1 };
    // this._ProductService.loadProductsPagination(this.pagination.currentPg, this.pagination.itemsPerPg).subscribe({
    //   next: (paginatedResult: PaginatedResult<ProductDto[]>) => {
    //     this.pagination = paginatedResult.pagination;
    //     this.products ={...<ProductDto[]> (paginatedResult.result)};
    //     // console.log('AQUI, AQUI', this.products)
    //   }
    // });

  }


  ngOnInit(): void {
    this.loadProducts();
  }

}
