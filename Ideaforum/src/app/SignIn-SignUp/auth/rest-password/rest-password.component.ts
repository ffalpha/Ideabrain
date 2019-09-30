import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent implements OnInit {
   email:string;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  }

  resetPassword(email){
    this.auth.resetpassword(this.email).then(()=>
    this.router.navigate(['/signin']))
  }

}
