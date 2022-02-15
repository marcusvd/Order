import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryDto } from '../../category/dto/category-dto';
import { SubCategoryDto } from '../../category/dto/sub-category-dto';
import { UnitOfMeasureDto } from '../../measure/dto/unit-of-measure';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
  providers: []
})
export class ProductInsertComponent implements OnInit {

  public category: CategoryDto[] = [];
  public uOfMeasures: UnitOfMeasureDto[] = [];
  public uom: UnitOfMeasureDto;
  public cat: CategoryDto;

  public subCat: SubCategoryDto[] = [];

  selectedCat: number;

  constructor(
    public _ProductService: ProductService
  ) { }

  OnChange() {
    console.log(this.selectedCat)
    let ghy = this.category.map((catId) => {
      if (catId.id === this.selectedCat) {
        this.subCat = catId.subCategories;
      }
    })
  }

  loadCategories() {
    this._ProductService.loadCats().subscribe((item: CategoryDto[]) => {
      this.category = item

      item.forEach((catDto: CategoryDto) => {
        this.subCat = catDto.subCategories;

      })

    })
  }












  catToShow() {
    return this.category.length > 0 ? true : false;
  }
  measureToShow() {
    return this.uOfMeasures.length > 0 ? true : false;
  }

  refresh() {
    window.location.reload();
  }


  ngOnInit(): void {
    this._ProductService.formInsert();
    this.loadCategories();
    this._ProductService.loadMeasures().subscribe((item: UnitOfMeasureDto[]) => {
      this.uOfMeasures = item

    })
  }

}
