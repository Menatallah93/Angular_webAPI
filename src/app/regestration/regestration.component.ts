import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../Validation/regestrationValidation';

@Component({
  selector: 'app-regestration',
  templateUrl: './regestration.component.html',
  styleUrls: ['./regestration.component.scss']
})
export class RegestrationComponent implements OnInit {

  RegisterationForm = this.fb.group({
      UserName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
      FirstName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
      LastName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
      yourEmail:['',[Validators.required,Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z]+\.[A-Za-z]+$')]],
      yourPassword:['',[Validators.required,Validators.minLength(6)]],
      ConfirmPassword:['',[Validators.required,Validators.minLength(6)]],
      Address: ['' , [Validators.required]],
      Image: ['' ,[Validators.required]],
      termCheck: ['', [Validators.required]],

    },{validator:[ConfirmPasswordValidator]});

  constructor(private fb:FormBuilder){}


 get UserName(){
    return this.RegisterationForm.get('UserName');
  }
  get FirstName(){
    return this.RegisterationForm.get('FirstName');
  }
  get LastName(){
    return this.RegisterationForm.get('LastName');
  }
  get yourEmail(){
    return this.RegisterationForm.get('yourEmail');
  }
  get Address(){
    return this.RegisterationForm.get('Address');
  }
  get yourPassword(){
    return this.RegisterationForm.get('yourPassword');
  }
  get ConfirmPassword(){
    return this.RegisterationForm.get('ConfirmPassword');
  }

  get termCheck(){
    return this.RegisterationForm.get('termCheck');
  }
 
  submitData(){
    console.log("hello");
  }




// RegisterForm:FormGroup;
//   constructor(private fb:FormBuilder){
//     this.RegisterForm=this.fb.group({
//       username:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
//       email:['',[Validators.required,Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z]+\.[A-Za-z]+$')]],
//       password:['',[Validators.required]],
//       confirmpassword  :['',[Validators.required]],
//       Whereyouhere:['',[Validators.required]]
//     },{validator:[ConfirmPasswordValidator]});

//   }
//  get Username(){
//     return this.RegisterForm.get('username');
//   }
//   get Email(){
//     return this.RegisterForm.get('email');
//   }
//   get Password(){
//     return this.RegisterForm.get('password');
//   }
//   get Confirmpassword(){
//     return this.RegisterForm.get('confirmpassword');
//   }
//   get Whereyouhere(){
//     return this.RegisterForm.get('Whereyouhere');
//   }
//   submitData(){

//   }
 ngOnInit(): void {
   
 }

}
