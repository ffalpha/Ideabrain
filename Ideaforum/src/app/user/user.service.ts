import { Injectable } from '@angular/core';
import{AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {User} from "./user.model";
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../core/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
   userCollection:AngularFirestoreCollection<User>;
   userDoc:AngularFirestoreDocument<User>;
  constructor(
    private afs:AngularFirestore,private auth:AuthService
  ) { }
  
  //getting users
getUsers(){
  this.userCollection=this.afs.collection('users');
  return this.userCollection.valueChanges();
}
//geting single user
getIn(id:string){
  this.userDoc=this.afs.doc<User>(`users/${id}`);
  return this.userDoc.valueChanges();
}
//updateing user profile
updateProfiledata(displayName:string,photoUrl:string){
  const user=this.auth.authState //getting current user
  const data={displayName,photoUrl}
  return user.updateProfile(data).then(()=>this.afs.doc(`users/${user.uid}`).update({displayName,photoUrl})).
  then(()=>console.log("Your profile has been updated")).
  catch(error=>console.log(error.message))//this coming from firebases sdk
}

updateEmaildata(email:string){
  const user=this.auth.authState //getting current user
  return user.updateEmail(email).then(()=>this.afs.doc(`users/${user.uid}`).update({email})).
  then(()=>console.log("Your Email has been updated")).
  then(user=>{
    this.auth.authState.sendEmailVerification().then(()=>console.log("Your Email sent"))
  }).
  catch(error=>console.log(error.message))//this coming from firebases sdk
}
}
