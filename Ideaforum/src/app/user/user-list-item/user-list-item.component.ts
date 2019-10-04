import { Component, OnInit,Input } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
  //geting from parent
  @Input() user:User
  constructor(private fire:AuthService) { }

  ngOnInit() {
  }
  
 
}
