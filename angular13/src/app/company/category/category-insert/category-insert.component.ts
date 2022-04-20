import { Component, Input, OnInit } from '@angular/core';


import { CategoryInsertService } from '../services/category-insert.service';


@Component({
  selector: 'category-insert',
  templateUrl: './category-insert.component.html',
  styleUrls: ['./category-insert.component.css']
})
export class CategoryInsertComponent implements OnInit {

  constructor(
    public _CatService: CategoryInsertService,


    ) { }


  ngOnInit(): void {
    this._CatService.formLoad();
  }

}
