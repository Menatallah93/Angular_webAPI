import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileservicesService } from '../Services/Profile.service';
import { IProfile } from '../Shared-Interface/IProfile';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private fb:FormBuilder  ,private ProfileService: ProfileservicesService){

  }

  ProfileData : IProfile = {
    id: 0,
    userid: '',
    fullName: '',
    fName: '',
    lName: '',
    about: '',
    company: '',
    job: '',
    cuntry: '',
    address: '',
    phone: '',
    email: '',
    twitterLink: '',
    facebookLink: '',
    instagramLink: '',
    linkedinLink: '',
    image: ''
  }
  Error: any;

  UpdatePofileForm = this.fb.group({
    fullName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
    fName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
    lName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
    about:[''],
    company:['',[Validators.required,Validators.minLength(6)]],
    job:['',[Validators.required,Validators.minLength(6)]],
    phone: ['' , [Validators.required]],
    address: ['' ,[Validators.required]],
    email: ['', [Validators.required]],
    twitterLink: ['', [Validators.required]],
    facebookLink: ['', [Validators.required]],
    instagramLink: ['', [Validators.required]],
    image: ['', [Validators.required]],
    linkedinLink: ['', [Validators.required]],
    cuntry: ['', [Validators.required]],
    

  });

  ngOnInit() {
    console.log(this.ProfileData);
    this.ProfileService.GetData("aaa54065-545e-45a2-99cc-be364a8b0562").subscribe({
      next: data => this.ProfileData = data,
      
      error: err => this.Error = err,
    })
  }
  
  SaveChanges() {
    console.log(this.UpdatePofileForm.value);
    this.ProfileService.UpdateData("aaa54065-545e-45a2-99cc-be364a8b0562",this.UpdatePofileForm.value)
    
    
  }
  get fullName(){
    return this.UpdatePofileForm.get('fullName');
  }
  
  get lName(){
    return this.UpdatePofileForm.get('lName');
  }
  get fName(){
    return this.UpdatePofileForm.get('fName');
  }
  get about(){
    return this.UpdatePofileForm.get('about');
  }
  get address(){
    return this.UpdatePofileForm.get('address');
  }
  get image(){
    return this.UpdatePofileForm.get('image');
  }
  get linkedinLink(){
    return this.UpdatePofileForm.get('linkedinLink');
  }

  get instagramLink(){
    return this.UpdatePofileForm.get('instagramLink');
  }
  
  get facebookLink(){
    return this.UpdatePofileForm.get('facebookLink');
  }
  get twitterLink(){
    return this.UpdatePofileForm.get('twitterLink');
  }
  get email(){
    return this.UpdatePofileForm.get('email');
  }
  get phone(){
    return this.UpdatePofileForm.get('phone');
  }
  get cuntry(){
    return this.UpdatePofileForm.get('cuntry');
  }

  get company(){
    return this.UpdatePofileForm.get('company');
  }
  

  get job(){
    return this.UpdatePofileForm.get('job');
  }

}
