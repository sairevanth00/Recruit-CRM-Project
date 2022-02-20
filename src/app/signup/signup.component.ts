import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private http:HttpClient, private router: Router) { }

  signUpForm! : FormGroup;
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  signup(){
    this.http.post<any>('http://localhost:3000/users', this.signUpForm.value).subscribe(res=>{
      alert("Sign Up is Successfull")
      this.signUpForm.reset();
      this.router.navigate(['login'])
    },err=>{
      alert("Something went wrong")
    })
  }

}
