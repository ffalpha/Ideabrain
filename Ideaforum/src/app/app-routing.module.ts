import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';



const routes: Routes = [
  {path :'',loadChildren :'./SignIn-SignUp/auth/auth.module#AuthModule'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
