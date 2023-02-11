import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-sub-details',
  templateUrl: './sub-details.component.html',
  styleUrls: ['./sub-details.component.css']
})
export class SubDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private location:Location) { }

  employeeArr: any[] = [];
  newEmployeeArr: any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params['id'];
      const localData = localStorage.getItem('EmployeeArray');
      if (localData != null) {
        this.employeeArr = JSON.parse(localData);
        for (let i = 0; i < this.employeeArr.length; i++) {
          if (this.employeeArr[i].id == id) {
            this.newEmployeeArr = this.employeeArr[i];
            console.log(this.newEmployeeArr);
          }
        }
      }
    });
  }

  goBack(){
    this.location.back();
  }

}
