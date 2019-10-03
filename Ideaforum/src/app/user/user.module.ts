import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{SharedModule } from '../shared/shared.module'
import { UserService } from './user.service';
import { UserDashboradComponent } from './user-dashborad/user-dashborad.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { CommonModule } from '@angular/common';  

const routes:Routes=[
  {path:'me',component:UserDashboradComponent,data:{title:"Dashborad"}},
  {path:'users',component:UserListComponent,data:{title:"Users"}},
  {path:'users/:id',component:UserDetailComponent,data:{title:"My Profile"}},

]
@NgModule({
  declarations: [UserDashboradComponent, UserDetailComponent, UserListComponent, UserListItemComponent],
  imports: [
   SharedModule,
   RouterModule.forChild(routes),
   CommonModule
  ],
   exports:[UserListItemComponent],
  providers: [UserService],
})
export class UserModule { }
