import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(private _Router: Router) { }


  navigate(utl: string) {
this._Router.navigate([`/${utl}`]);
  }


  ngOnInit(): void {
  }

}
