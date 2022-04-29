import { Component, OnInit } from '@angular/core';

import { CategoryDto } from 'src/app/company/category/dto/category-dto';
import { CategoryEditService } from '../services/category-edit.service';
import { CategoryListService } from '../services/category-list.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  public categories: CategoryDto[] = [];
  isVisible = 'none';
  constructor(
    private _CatListServices: CategoryListService,
    private _CatEditServices: CategoryEditService,
  ) { }


  get catInsertShow() {
   return this._CatListServices.catInsertShow;
  }
  catShowHide(){
    this._CatListServices.catShowHide();
  }

  toDelete(record: any) {

    this._CatListServices.toDelete(record);
  }

  toInfo(record: CategoryDto) {
    this._CatListServices.toInfo(record);

  }
  toEdit(record: CategoryDto) {
    this._CatEditServices.toEdit(record);
  }





  ngOnInit(): void {
    this._CatListServices.loadCats().subscribe({
      next: (cats: CategoryDto[]) => {
        this.categories = cats;
      }, error: (err) => { }
    })

  }

}
