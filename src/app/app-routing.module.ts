import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLinkedinComponent } from './home-linkedin/home-linkedin.component';
import { LoginComponent } from './login/login.component';
import { RegestrationComponent } from './regestration/regestration.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleProfileComponent } from './single-profile/single-profile.component';

const routes: Routes = [
  {path:'' , redirectTo:'login' , pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:"home",component:HomeLinkedinComponent},
  {path:'Register',component:RegestrationComponent},
  {path: 'profile' , component:ProfileComponent},
  {path: 'profile/:id' , component:SingleProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  
 }
