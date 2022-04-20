import { Component, Input, OnInit } from '@angular/core';
import { CategoryDto } from '../dto/category-dto';
import { CategoryEditService } from '../services/category-edit.service';


@Component({
  selector: 'category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  @Input() category: CategoryDto = new CategoryDto();

  constructor(
    public _CatService: CategoryEditService
  ) { }


  ngOnInit(): void {
    this._CatService.formLoadEdit();

    this._CatService.formCategoryEdit.patchValue({
      id: this.category.id,
      name: this.category.name,
      subCategories: this.category.subCategories
    });

    // this._CatService.loadCats().subscribe({
    //   next: ((cat: CategoryDto[]) => {




    //     this._CatService.categories = cat;
    //   }),
    //   error: (error) => {
    //     alert('deu ruim')
    //     this._CatService._ValidatorsSrv.cleanAfters(['contact', 'address'], this._CatService.formCategoryEdit);
    //   },
    // });


  }

}
