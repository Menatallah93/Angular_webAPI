import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileservicesService } from '../Services/Profile.service';
import { FrindRequstService } from '../Services/frind-requst.service';
import { IProfile } from '../Shared-Interface/IProfile';
import { ISendRequest } from '../Shared-Interface/ISendRequest';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private fb: FormBuilder, private ProfileService: ProfileservicesService,
    private FrindRequest: FrindRequstService) {

  }

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
  Error: any;

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

  fromId: string = "292c22c6-2574-4cbc-979e-c94a0640eca0"
  toId: string = "1f934b5a-b637-49b7-bbfa-c65ca5a2a6ea"

  oldpass: string = ''
  newpass: string = ''
  confirmpass: string = ''

  UpdatePassForm = this.fb.group({
    oldpass: ['',],
    newpass: ['',],
    confirmpass: ['',],

  });

  ConnectForm = this.fb.group({
    fromId: [''],
    toId: ['']

  });




  ngOnInit() {
    console.log(this.ProfileData);
    this.ProfileService.GetData("1f934b5a-b637-49b7-bbfa-c65ca5a2a6ea").subscribe({
      next: data => this.ProfileData = data,

      error: err => this.Error = err,
    })
    console.log(this.ProfileData);
  }

  SaveChanges() {
    console.log(this.ProfileData);
    this.ProfileService.UpdateData("1f934b5a-b637-49b7-bbfa-c65ca5a2a6ea", this.ProfileData).subscribe({
      next: data => this.ProfileData = data,

      error: err => console.log(err),
    })
  }

  PassChanges() {
    console.log(this.newpass);
    console.log(this.oldpass);
    this.ProfileService.ChangePass("1f934b5a-b637-49b7-bbfa-c65ca5a2a6ea", this.newpass, this.oldpass).subscribe({
      next: data => console.log(data),

      error: err => console.log(err),
    })
  }

  SendConnect() {
    this.FrindRequest.SenConnect(this.fromId, this.toId).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })
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
