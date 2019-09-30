import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from '../shared/shared.module'
import { AdminpanelComponent } from 'src/app/adminpanel/adminpanel.component';
//Adding routes
const routes: Routes = [
  {path:'signin',component:SigninComponent,data:{title:'Sign In'}},
  {path:'signup',component:SignupComponent,data:{title:'Sign Up'}},
  {path:'reset-password',component:RestPasswordComponent,data:{title:'Reset password'}},
  {path:'adminpanel',component:AdminpanelComponent}]
  

@NgModule({
  declarations: [SigninComponent, SignupComponent, RestPasswordComponent,AdminpanelComponent ],
  imports: [RouterModule.forChild(routes),SharedModule]
})
export class AuthModule { }
