import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  employeeDetailsArr: any[] = [];
  actionButton: string = 'Save';
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    const localData = localStorage.getItem('EmployeeArray')
    if (localData != null) {
      this.employeeDetailsArr = JSON.parse(localData)
    }
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params['id'];
      if (localData != null && id != undefined) {
        const record = this.employeeDetailsArr.find(m => m.id == id);
        if(record==undefined || record==null){
          this.router.navigate(['/form'])
        }
        for (let i = 0; i < this.employeeDetailsArr.length; i++) {
          if (this.employeeDetailsArr[i].id == id) {
            this.actionButton = "Update";
            this.employeeForm.controls['id'].setValue(this.employeeDetailsArr[i].id);
            this.employeeForm.controls['firstName'].setValue(this.employeeDetailsArr[i].firstName);
            this.employeeForm.controls['middleName'].setValue(this.employeeDetailsArr[i].middleName);
            this.employeeForm.controls['lastName'].setValue(this.employeeDetailsArr[i].lastName);
            this.employeeForm.controls['email'].setValue(this.employeeDetailsArr[i].email);
            this.employeeForm.controls['phoneNo'].setValue(this.employeeDetailsArr[i].phoneNo);
            this.employeeForm.controls['address1'].setValue(this.employeeDetailsArr[i].address1);
            this.employeeForm.controls['address2'].setValue(this.employeeDetailsArr[i].address2);
            this.employeeForm.controls['state'].setValue(this.employeeDetailsArr[i].state);
            this.employeeForm.controls['city'].setValue(this.employeeDetailsArr[i].city);
            this.employeeForm.controls['zip'].setValue(this.employeeDetailsArr[i].zip);
          }
        }
      }
    });
  }



  @ViewChild('form') form: any;

  employeeForm: FormGroup = this.fb.group({
    id: [''],
    firstName: ['', [Validators.required]],
    middleName: [''],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    phoneNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^(0|\+91)?[789]\d{9}$/)]],
    address1: ['', [Validators.required]],
    address2: [''],
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zip: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
  });


  addData() {
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params['id'];
      if (id != null) {
        const record = this.employeeDetailsArr.find(m => m.id == this.employeeForm.value.id);
        if (record != undefined || record != null) {
          record.firstName = this.employeeForm.value.firstName;
          record.middleName = this.employeeForm.value.middleName;
          record.lastName = this.employeeForm.value.lastName;
          record.email = this.employeeForm.value.email;
          record.phoneNo = this.employeeForm.value.phoneNo;
          record.address1 = this.employeeForm.value.address1;
          record.address2 = this.employeeForm.value.address2;
          record.state = this.employeeForm.value.state;
          record.city = this.employeeForm.value.city;
          record.zip = this.employeeForm.value.zip;
          if (!this.employeeForm.valid) {
            return;
          } else {
            localStorage.setItem('EmployeeArray', JSON.stringify(this.employeeDetailsArr));
            Swal.fire({
              icon: 'success',
              title: 'Details Updated Successfully',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }else{
          this.router.navigate(['/form']);
          Swal.fire({
            icon: 'error',
            title: 'Oops Id Doesnt Exist',
            text:'Wrong Id in url',
            showConfirmButton: false,
            timer: 1500
          })
        }

      } else {
        if (!this.employeeForm.valid) {
          return;
        } else {
          this.employeeForm.value.id = this.employeeDetailsArr.length + 1
          this.employeeDetailsArr.push(this.employeeForm.value);
          localStorage.setItem('EmployeeArray', JSON.stringify(this.employeeDetailsArr));
          Swal.fire({
            icon: 'success',
            title: 'Details Added Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.form.resetForm();
        }
      }
    });

  }
}
