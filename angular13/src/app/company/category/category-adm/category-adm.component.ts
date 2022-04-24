import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsToastr } from '../../shared/services/alerts-toastr';
import { CategoryDto } from 'src/app/company/category/dto/category-dto';
import { CategoryEditService } from '../services/category-edit.service';
import { CategoryListService } from '../services/category-list.service';
// import { DeleteService } from 'src/app/company/shared/components/delete/services/delete.service';

@Component({
  selector: 'app-category-adm',
  templateUrl: './category-adm.component.html',
  styleUrls: ['./category-adm.component.css']
})
export class CategoryAdmComponent implements OnInit {
  public categories: CategoryDto[] = [];
  isVisible = 'none';
  constructor(
    public CatListServices: CategoryListService,
    public CatEditServices: CategoryEditService,
    // public DeleteService: DeleteService,
    private Router: Router,
    private AlertsToastr: AlertsToastr,
  ) { }




  // editShow(evt: number) {

  //   this.CatEditServices.formCategoryEdit.reset;
  //   const id = evt.toString();
  //   switch (document.getElementById(id).style.display) {
  //     case 'none': {
  //       document.getElementById(id).style.display = 'block';

  //       break
  //     }
  //     case 'block': {
  //       document.getElementById(id).style.display = 'none';
  //       break
  //     }
  //   }
  // }



  ngOnInit(): void {
    this.CatListServices.loadCats().subscribe({
      next: (cats: CategoryDto[]) => {

          this.categories = cats;


      }, error: (err) => { }
    })



  }

}
