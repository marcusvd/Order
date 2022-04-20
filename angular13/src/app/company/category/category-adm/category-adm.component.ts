import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsToastr } from '../../shared/services/alerts-toastr';
import { CategoryDto } from '../dto/category-dto';
import { CategoryEditService } from '../services/category-edit.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-adm',
  templateUrl: './category-adm.component.html',
  styleUrls: ['./category-adm.component.css']
})
export class CategoryAdmComponent implements OnInit {
  public categories: CategoryDto[] = [];
  isVisible = 'none';
  constructor(
    public _CatServices: CategoryService,
    public _CatEditServices: CategoryEditService,
    private _Router: Router,
    private _AlertsToastr: AlertsToastr,
  ) { }




  editShow(evt: number) {
    const id = evt.toString()
    switch (document.getElementById(id).style.display) {
      case 'none': {
        document.getElementById(id).style.display = 'block';
        break
      }
      case 'block': {
        document.getElementById(id).style.display = 'none';
        break
      }
    }

  }


  ngOnInit(): void {
    this._CatServices.loadCats().subscribe((cats) => {
      this.categories = cats;

    }, error => {
      if (error.status === 401) {
        this._Router.navigate(['login']);
        this._AlertsToastr.Notice('Falha de login!', null, 'Error', error)
      }
    })




  }

}
