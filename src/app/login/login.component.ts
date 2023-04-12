import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  imgSrc: string='assets/img/safe.png';
  LoginForm:FormGroup;
  constructor(private fb:FormBuilder){
    this.LoginForm=fb.group({
      Username:['',[Validators.required]],
      Password:['',[Validators.required]],
    });

  }

  get Username(){
    return this.LoginForm.get('Username');
  }
  get Password(){
    return this.LoginForm.get('password');
  }
  submitData(){

  }
}
