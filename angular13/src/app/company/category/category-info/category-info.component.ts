import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryDto } from 'src/app/company/category/dto/category-dto';



import { CategoryListService } from 'src/app/company/category/services/category-list.service';
import { SubCategoryDto } from '../dto/sub-category-dto';
import { CategoryEditService } from '../services/category-edit.service';



@Component({
  selector: 'category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})
export class CategoryInfoComponent implements OnInit {


  constructor(
    private _CategoryListServices: CategoryListService,
    public CategoryEditServices: CategoryEditService,
    private _ActRouter: ActivatedRoute,
    private _BsModalService: BsModalService,
   public _ModalRef: BsModalRef
  ) { }



  category: CategoryDto;
  subCategoryInfo: SubCategoryDto;

 delete(cat: CategoryDto){
  this._CategoryListServices.toDelete(cat)
 }


  ngOnInit(): void {
    this.category = this._BsModalService.config.initialState['list']['record'] as CategoryDto;
  }

}
