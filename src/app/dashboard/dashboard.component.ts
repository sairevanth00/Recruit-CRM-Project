import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
//import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from '../company.service';
import { companyDetailsModel } from './company.details.model'
const ELEMENT_DATA: companyDetailsModel[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Company_name', 'Company_website','Address', 'City', 'State', 'Actions'];
  dataSource = (ELEMENT_DATA);
  newCompanyDetails:FormGroup = new FormGroup({});
  companyData! : any;
  companyModelObj!: companyDetailsModel;

  @ViewChild(MatSort, {static: true}) sort!:MatSort;
  @ViewChild(MatPaginator, {static: true }) paginator!: MatPaginator;

  

  constructor(private fb : FormBuilder,private companyService: CompanyService,private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.newCompanyDetails= this.fb.group({
      "company_name" : new FormControl('',[Validators.required]),
      "company_website" : new FormControl('',[Validators.required]),
      "company_phonenumber" : new FormControl('',[Validators.required]),
      'company_address' : new FormControl('',[Validators.required]),
      'company_city':new FormControl('',[Validators.required]),
      'company_state':new FormControl('',[Validators.required]),
      'company_country':new FormControl('',[Validators.required]),
      'industry_list':new FormControl('',[Validators.required])
    })

    this.getCompanyDetailsFromServer()
  }

//------------------------------------------------------Display Company List--------------------------------------------------------------
  getCompanyDetailsFromServer(){
    this.companyService.getCompanyDetails().subscribe(res=>{
      this.dataSource = (res);
    })
  }

//--------------------------------------------------------------Add New Company------------------------------------------------------------
  addCompanyDetails(){
    this.companyModelObj.company_name = this.newCompanyDetails.value.company_name;
    this.companyModelObj.company_website = this.newCompanyDetails.value.company_website;
    this.companyModelObj.company_phonenumber = this.newCompanyDetails.value.company_phonenumber;
    this.companyModelObj.company_address = this.newCompanyDetails.value.company_address;
    this.companyModelObj.company_city = this.newCompanyDetails.value.company_city;
    this.companyModelObj.company_state = this.newCompanyDetails.value.company_state;
    this.companyModelObj.company_country = this.newCompanyDetails.value.company_country;
    this.companyModelObj.industry_list = this.newCompanyDetails.value.industry_list;

    this.companyService.addNewCompany(this.newCompanyDetails).subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.newCompanyDetails.reset();
      this.getCompanyDetailsFromServer();
    },err=>{
      alert('Something Went Wrong')
    })
  }

//-----------------------------------------------------Edit company----------------------------------------------------------------
  editCompany(element:any){
    //this.companyModelObj.id = element.id;
    this.newCompanyDetails.controls["company_name"].setValue(element.company_name);
    this.newCompanyDetails.controls["company_website"].setValue(element.company_website);
    this.newCompanyDetails.controls["company_phonenumber"].setValue(element.company_phonenumber);
    this.newCompanyDetails.controls["company_address"].setValue(element.company_address);
    this.newCompanyDetails.controls["company_city"].setValue(element.company_city);
    this.newCompanyDetails.controls["company_state"].setValue(element.company_state);
    this.newCompanyDetails.controls["company_country"].setValue(element.company_country);
    this.newCompanyDetails.controls["industry_list"].setValue(element.industry_list);
  }
//----------------------------------------------------update company-----------------------------------------------------------
  updateCompanyDetails(){
    this.companyModelObj.company_name = this.newCompanyDetails.value.company_name;
    this.companyModelObj.company_website = this.newCompanyDetails.value.company_website;
    this.companyModelObj.company_phonenumber = this.newCompanyDetails.value.company_phonenumber;
    this.companyModelObj.company_address = this.newCompanyDetails.value.company_address;
    this.companyModelObj.company_city = this.newCompanyDetails.value.company_city;
    this.companyModelObj.company_state = this.newCompanyDetails.value.company_state;
    this.companyModelObj.company_country = this.newCompanyDetails.value.company_country;
    this.companyModelObj.industry_list = this.newCompanyDetails.value.industry_list;

    this.companyService.updateCompany(this.companyModelObj,this.companyModelObj.id).subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.newCompanyDetails.reset();
      this.getCompanyDetailsFromServer();
    })
  }
//-----------------------------------------------------delete company---------------------------------------------------------------
  deleteCompany(element:any){
    this.companyService.deleteCompany(element.id).subscribe(res=>{
        alert("Company Deleted Successfully")
        this.getCompanyDetailsFromServer()
    })

    }

    resetForm(){
      this.newCompanyDetails.reset();
    }
}
