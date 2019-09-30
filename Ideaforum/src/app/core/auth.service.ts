import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from "firebase/app";
import {AngularFireAuth} from '@angular/fire/auth';
import{AngularFirestore,AngularFirestoreDocument
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {Md5} from 'ts-md5/dist/md5';
interface User{
  uid:string;
  email:string;
  userrole?:string;
  NIC?:string;
  photoUrl?:string;
  displayName?:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState:any=null;
 user:Observable<User>
  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private router:Router

  ) { 
    //Chekcing if there is a user.If so return a firestore user doccument
    this.user =this.afAuth.authState.switchMap(user=>{
      if(user){
        return this.afs.doc<User>('user/${user.id}').valueChanges();

      }else{
        return Observable.of(null)
      }
    })
    this.afAuth.authState.subscribe(data=>this.authState=data)
  }

  //checking if user is autenticated
  get authenticated():boolean{
    return this.authState !=null
  }

  get currrentUserId():string{
    return this.authenticated?this.authState.uid:null;
  }
  //Email signin method
  emailSignIn(email:string,password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(()=>console.log("You have successfully signed in",this.router.navigate(['/'])))
    .catch(error =>console.log(error.message)) 
  }

   //Email user Regsitration method
   emailSignUp(email:string,password:string){
     return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
     .then(user => this.createCollection(user.user))
     .then(() => console.log("Welcome you have sucssfully Regsirted"))
     .then(user=>{
       this.afAuth.auth.currentUser.sendEmailVerification()
       .then(()=>console.log("Email.verrification have sent.Plz chekc you email",this.router.navigate(['/adminpanel'])))
       .catch(error=>console.log(error.message))
     })
     .catch(error =>console.log(error.message)) 
   }

   //reset password method
   resetpassword(email:string){
     return firebase.auth().sendPasswordResetEmail(email)
     .then(
     ()=>console.log("We have sent you a password reset link"))
     .catch(error=>console.log(error.message));
   }

  //Signout method
   signOut(){
     return this.afAuth.auth.signOut().then
     (()=>{
       this.router.navigate(['/'])
     })
   }
  
   googleLogin(){
     const provider=new firebase.auth.GoogleAuthProvider();
     return this.socialLogin(provider);
   }

   githubLogin(){
    const provider=new firebase.auth.GithubAuthProvider();
    return this.socialLogin(provider);
  }
  facebookLogin(){
    const provider=new firebase.auth.FacebookAuthProvider();
    return this.socialLogin(provider);
  }
  twitterLogin(){
    const provider=new firebase.auth.TwitterAuthProvider();
    return this.socialLogin(provider);
  }
   private socialLogin(provider){
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.createCollection(credential.user);
      })
      .catch(error => console.log(error.message));
  }

   //Creating a fresh Document from the userid to store user details
    private createCollection(user) {
       const userRef: AngularFirestoreDocument<User> = this.afs.doc(
          `users/${user.uid}`
        );
        const data: User = {
          uid: user.uid,
          email: user.email || null,
          userrole:"User",
          NIC:"13142124",
          displayName: user.displayName,
          photoUrl:"https://www.gravatar.com/avatar/"+Md5.hashStr(user.uid)+"?d=identicon"
          
         
        };
        return userRef.set(data, { merge: true });
      }
}
