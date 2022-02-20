import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { companyDetailsModel } from './dashboard/company.details.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }
  /*------------------------------------- TO Add New Company ------------------------------------------------------*/

  addNewCompany(companydetails:any):Observable<companyDetailsModel[]>{
    return this.http.post<companyDetailsModel[]>("http://localhost:3000/companydetails", companydetails.value).pipe(map((res:any)=>{
      return res
    }))
  }
  /*------------------------------------- TO Get Company Details ------------------------------------------------------*/

  getCompanyDetails():Observable<companyDetailsModel[]>{
    return this.http.get<companyDetailsModel[]>("http://localhost:3000/companydetails").pipe(map((res:any)=>{
      return res
    }))
  }
  /*------------------------------------- TO Update Company ------------------------------------------------------*/

  updateCompany(data:any,id:number){
    return this.http.get<any>("http://localhost:3000/companydetails/"+ id, data).pipe(map((res:any)=>{
      return res
    }))
  }
  /*------------------------------------- TO Delete Company ------------------------------------------------------*/

  deleteCompany(id: any){
    return this.http.delete<any>("http://localhost:3000/companydetails/"+id).pipe(map((res:any)=>{
      return res
    }))
  }
}
