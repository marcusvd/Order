import { Component, Input, OnInit } from '@angular/core';


import { CategoryService } from '../services/category.service';


@Component({
  selector: 'category-insert',
  templateUrl: './category-insert.component.html',
  styleUrls: ['./category-insert.component.css']
})
export class CategoryInsertComponent implements OnInit {

  constructor(
    public _CatService: CategoryService,


    ) { }


  ngOnInit(): void {
    this._CatService.formLoad();
  }

}
