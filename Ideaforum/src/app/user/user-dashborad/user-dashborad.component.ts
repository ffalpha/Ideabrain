import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from '../user.service';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-dashborad',
  templateUrl: './user-dashborad.component.html',
  styleUrls: ['./user-dashborad.component.css']
})
export class UserDashboradComponent implements OnInit {
  editing=false;
  user:User;
  task:AngularFireUploadTask //for uploading
  downloadURL;//for uploading
  constructor(private auth:AuthService,private userService:UserService,private storage:AngularFireStorage) { }
  
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
  
  async uploadPhotoURL (event) {
   
    const file = event.target.files[0];
    const path = `users/${this.user.uid}/photos/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only images allowed');
    } else {
      this.task = this.storage.upload(path, file);
   
      // add this ref
      const ref = this.storage.ref(path);
      await this.task.snapshotChanges().toPromise();
      this.downloadURL=await ref.getDownloadURL().toPromise();
      this.userService.updateProfiledata(this.user.displayName, this.downloadURL);
      console.log("Kalana");
    } 
  }

  //updateing other details
   updateuser(){
     const data={
      
     }
   }
}
