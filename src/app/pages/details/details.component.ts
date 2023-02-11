import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  employeeArr:any[]=[];
  constructor() { }

  ngOnInit(): void {
  const localData=localStorage.getItem('EmployeeArray');
  if(localData!=null){
    this.employeeArr=JSON.parse(localData);
    this.dataSource= new MatTableDataSource(this.employeeArr);
    this.dataSource.sort!=this.sort;
    this.dataSource.paginator!=this.paginator;
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['srNo','firstName','middleName','lastName','action'];
  dataSource :MatTableDataSource<any>;


    // Filter function for table
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    edit(id:any){
      alert(id)
    }

    deleteAlert(id:any){
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this employee's data!",
        icon: 'warning',
        focusCancel:true,
        showCancelButton: true,
        confirmButtonColor: '#673AB7',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          for(let i=0; i < this.employeeArr.length; i++){
            if(this.employeeArr[i].id==id){
              let newId=id-1
              this.employeeArr.splice(newId,1);
              this.dataSource= new MatTableDataSource(this.employeeArr);
              localStorage.setItem('EmployeeArray', JSON.stringify(this.employeeArr));
              Swal.fire({
                icon: 'success',
                title: 'Details Deleted Successfully',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }
        }
      })
    }
}
