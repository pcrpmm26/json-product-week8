import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { EmployeeModels } from './employee-dashboard.models';
import { ApiService } from '../shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formEmployee!: FormGroup;
  employeeModel: EmployeeModels = new EmployeeModels();
  employeeData: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.formEmployee = new FormGroup({
      picture: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
      stock: new FormControl(),
    })
    this.getEmployee()
  }

  postEmployee(){
    this.employeeModel.picture = this.formEmployee.value.picture
    this.employeeModel.name = this.formEmployee.value.name
    this.employeeModel.price = this.formEmployee.value.price
    this.employeeModel.stock = this.formEmployee.value.stock
    this.api.postEmployee(this.employeeModel)
    .subscribe(res=>{
      Swal.fire("Complete","Add Product Complete","success")
      this.getEmployee()
      let close = document.getElementById("close")
      close!.click()
    },
    err=>{
      Swal.fire("Error","Add Product Error","error")
    })
  }

  getEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    },)
  }

  deleteEmployee(id: number){
    this.api.deleteEmployee(id)
    .subscribe(res=>{
      Swal.fire("Complete","Delete Product Complete","success")
      this.getEmployee()
    },
    err=>{
      Swal.fire("Error","Delete Product Error","error")
    })
  }

  clickAdd(){
    this.formEmployee.reset()
    this.showAdd = true
    this.showUpdate = false
  }

  clickEdit(data: any){
    this.showAdd = false
    this.showUpdate = true
    this.employeeData.id = data.id
    this.formEmployee.controls['picture'].setValue(data.picture)
    this.formEmployee.controls['name'].setValue(data.name)
    this.formEmployee.controls['price'].setValue(data.price)
    this.formEmployee.controls['stock'].setValue(data.stock)
  }

  updateEmployee(){
    this.employeeModel.picture = this.formEmployee.value.picture
    this.employeeModel.name = this.formEmployee.value.name
    this.employeeModel.price = this.formEmployee.value.price
    this.employeeModel.stock = this.formEmployee.value.stock
    this.api.updateEmployee(this.employeeData.id,this.employeeModel)
    .subscribe(res=>{
      Swal.fire("Complete","Update Product Complete","success")
      this.getEmployee()
      let close = document.getElementById("close")
      close!.click()
    },
    err=>{
      Swal.fire("Error","Update Product Error","error")
    })
  }

}
