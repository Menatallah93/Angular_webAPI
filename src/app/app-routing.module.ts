import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLinkedinComponent } from './home-linkedin/home-linkedin.component';
import { LoginComponent } from './login/login.component';
import { RegestrationComponent } from './regestration/regestration.component';

const routes: Routes = [
  {path:'' , redirectTo:'login' , pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:"home",component:HomeLinkedinComponent},
  {path:'Register',component:RegestrationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  
 }
