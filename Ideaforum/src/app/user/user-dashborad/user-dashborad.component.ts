import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dashborad',
  templateUrl: './user-dashborad.component.html',
  styleUrls: ['./user-dashborad.component.css']
})
export class UserDashboradComponent implements OnInit {
  editing=false;
  user:User
  constructor(private auth:AuthService,private userService:UserService) { }
  
  ngOnInit() {
    this.getcurrentuser();
  }
  
  getcurrentuser(){
    return this.auth.user.subscribe(user=>{this.user=user});
  }

  updateProfile(){
    return this.userService.updateProfiledata(
      this.user.displayName,
      this.user.photoUrl
    );
  }

  updateEmail(){
    return this.userService.updateEmaildata(this.user.email);
  }
}
