import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../Validation/regestrationValidation';
import { AuthorizeService } from '../Services/authorize.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-regestration',
  templateUrl: './regestration.component.html',
  styleUrls: ['./regestration.component.scss']
})

export class RegestrationComponent implements OnInit {
  constructor(private fb:FormBuilder,private Auth:AuthorizeService,private rote:Router){}

  RegisterationForm = this.fb.group({
    userName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
    fName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
    lName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
    email:['',[Validators.required,Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z]+\.[A-Za-z]+$')]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',[Validators.required,Validators.minLength(6)]],
    address: ['' , [Validators.required]],
    image: ['' ,[Validators.required]],

    },{validator:[ConfirmPasswordValidator]});

   

 get UserName(){
    return this.RegisterationForm.get('userName');
  }
  get FirstName(){
    return this.RegisterationForm.get('fName');
  }
  get LastName(){
    return this.RegisterationForm.get('lName');
  }
  get yourEmail(){
    return this.RegisterationForm.get('email');
  }
  get Address(){
    return this.RegisterationForm.get('address');
  }
  get yourPassword(){
    return this.RegisterationForm.get('password');
  }
  get ConfirmPassword(){
    return this.RegisterationForm.get('confirmPassword');
  }

 
 
  submitData(data:FormGroup){
    console.log(data.value);
    this.Auth.register(data.value).subscribe((info)=>
    {
if(info.message=="sucess")
{
  this.rote.navigate(['/login']);
}
else
{
  console.log("Not vaild");

}
})
    
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
