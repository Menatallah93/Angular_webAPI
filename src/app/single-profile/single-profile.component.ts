import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FrindRequstService } from '../Services/frind-requst.service';
import { AuthorizeService } from '../Services/authorize.service';
import { ProfileservicesService } from '../Services/Profile.service';
import { IPost } from '../Shared-Interface/IPost';
import { IProfile } from '../Shared-Interface/IProfile';

@Component({
  selector: 'app-single-profile',
  templateUrl: './single-profile.component.html',
  styleUrls: ['./single-profile.component.scss']
})
export class SingleProfileComponent {
  constructor(private fb: FormBuilder, private ProfileService: ProfileservicesService,
    private FrindRequest: FrindRequstService,private Auth:AuthorizeService,
    private activerout: ActivatedRoute) {

  }

  userId : any ;
  user : any ;
  Error: any;

  MyPostss : IPost[] = []
  ProfileData: IProfile = {
    userId: '',
    fullName: '',
    fName: '',
    lName: '',
    about: '',
    company: '',
    job: '',
    cuntry: '',
    address: '',
    phone: '',
    twitterLink: '',
    facebookLink: '',
    instagramLink: '',
    linkedinLink: '',
    image: '',

  }
  

  UpdatePofileForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    fName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    lName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    about: [''],
    company: ['', [Validators.required, Validators.minLength(6)]],
    job: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required]],
    twitterLink: ['', [Validators.required]],
    facebookLink: ['', [Validators.required]],
    instagramLink: ['', [Validators.required]],
    image: ['', [Validators.required]],
    linkedinLink: ['', [Validators.required]],
    cuntry: ['', [Validators.required]],
  });


  ConnectForm = this.fb.group({
    fromId: [''],
    toId: ['']

  });

  fromId: string = '';
  toId: string ='';

  ngOnInit() {
    console.log(this.ProfileData);
    this.ProfileService.GetData(this.Auth.gettokenID()).subscribe({
      next: data => this.ProfileData = data,

      error: err => this.Error = err,
    })
    console.log(this.ProfileData);

    this.MyPosts();

this.activerout.paramMap.subscribe((parm: ParamMap) => {
    this.userId = parm.get("id");
    this.user = this.ProfileService.GetData(this.userId);
})

  this.fromId = this.Auth.gettokenID();
   this.toId= this.userId;
}

    MyPosts() {
      
      this.ProfileService.GetMyPosts(this.Auth.gettokenID()).subscribe({
        next: data => this.MyPostss = data,
        
        error: err => console.log(err),
      })
    }

  isClick : Boolean = true;
  SendConnect() {
    this.FrindRequest.SenConnect(this.fromId, this.toId).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })
this.isClick = false;
  }



  get fullName() {
    return this.UpdatePofileForm.get('fullName');
  }

  get lName() {
    return this.UpdatePofileForm.get('lName');
  }

  get fName() {
    return this.UpdatePofileForm.get('fName');
  }
  get about() {
    return this.UpdatePofileForm.get('about');
  }
  get address() {
    return this.UpdatePofileForm.get('address');
  }
  get image() {
    return this.UpdatePofileForm.get('image');
  }
  get linkedinLink() {
    return this.UpdatePofileForm.get('linkedinLink');
  }
  get instagramLink() {
    return this.UpdatePofileForm.get('instagramLink');
  }
  get facebookLink() {
    return this.UpdatePofileForm.get('facebookLink');
  }
  get twitterLink() {
    return this.UpdatePofileForm.get('twitterLink');
  }
  get email() {
    return this.UpdatePofileForm.get('email');
  }
  get phone() {
    return this.UpdatePofileForm.get('phone');
  }
  get cuntry() {
    return this.UpdatePofileForm.get('cuntry');
  }

  get company() {
    return this.UpdatePofileForm.get('company');
  }

  get job() {
    return this.UpdatePofileForm.get('job');
  }
}
