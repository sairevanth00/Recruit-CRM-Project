import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup
  constructor(private formBuilder: FormBuilder,private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required]],
      password :['',[Validators.required]],
    })
  }

  login(){
    this.http.get<any>("http://localhost:3000/users").subscribe(res=>{
      const users = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(users){
        console.log(users)
        alert("Login Successfully!")
        this.loginForm.reset();
        this.router.navigate(["dashboard"])
      }else{
        alert("User not Found")
      }
    },err=>{
      alert("Something Went Wrong!")
    })
  }


}
