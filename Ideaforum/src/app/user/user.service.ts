import { Injectable } from '@angular/core';
import{AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {User} from "./user.model";
@Injectable({
  providedIn: 'root'
})
export class UserService {
   userCollection:AngularFirestoreCollection<User>;
   userDoc:AngularFirestoreDocument<User>;
  constructor(
    private afs:AngularFirestore
  ) { }
  
getUsers(){
  this.userCollection=this.afs.collection('users');
  return this.userCollection.valueChanges();
}
getIn(id:string){
  this.userDoc=this.afs.doc<User>(`users/${id}`);
  return this.userDoc.valueChanges();
}

}
