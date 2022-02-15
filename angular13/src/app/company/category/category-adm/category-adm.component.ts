import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsToastr } from '../../shared/services/alerts-toastr';
import { CategoryDto } from '../dto/category-dto';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-adm',
  templateUrl: './category-adm.component.html',
  styleUrls: ['./category-adm.component.css']
})
export class CategoryAdmComponent implements OnInit {
  public categories: CategoryDto[] = [];
  constructor(
    private _CatServices: CategoryService,
    private _Router: Router,
    private _AlertsToastr: AlertsToastr,
  ) { }

  ngOnInit(): void {
    this._CatServices.loadCats().subscribe((cats) => {
      this.categories = cats;

    }, error => {
      if (error.status === 401) {
        this._Router.navigate(['login']);
        this._AlertsToastr.Notice('Falha de login!',null,'Error',error)
      }
    })
  }

}
