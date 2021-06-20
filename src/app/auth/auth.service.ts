/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User,UserInterface } from './user.model';
import { Plugins } from '@capacitor/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import {auth} from "firebase/app";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string; // lo que se demora en subscribirse
  localId: string; // user id
  expiresIn: string;
  registered?: boolean; // está registtrado o no, esto es opcional ya que en sign in no lo necesitamos
}
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;
  // !! means that were forcind token to be a boolean type
 /* get token() {
    // eslint-disable-next-line no-underscore-dangle
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          console.log('tenemos token en auth service!');
          return user.token;
        } else {
          return null;
        }
      })
    );
  }*/
  autoLogin() {
    return from(
      Plugins.Storage.get({
        key: 'authData',
      })
    ).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        // string to storedData
        const paredData = JSON.parse(storedData.value) as {
          // token: string;
          // tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        // const expirationTime = new Date(paredData.tokenExpirationDate);
        // if (expirationTime <= new Date()) {
        //   return null;
        // }
        const user = new User(
          paredData.userId,
          paredData.email,
        );
        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
          // this.autoLogout(user.tokenDuration);
        }
      }),
      map((user) => !!user)
    );
  }
  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
  get userIsAuthenticated() {
    // eslint-disable-next-line no-underscore-dangle
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.id;
        }
        return false;
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {return user.id;}
        return null;
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private http: HttpClient,
      private afsAuth: AngularFireAuth,
      private afs: AngularFirestore) {}

  login(email: string, password: string) {
    return new Promise((resolve,reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email,password)
      .then(userdata =>{
        console.log("auth.service.login data");
        console.log(userdata.user.refreshToken);
        console.log(this.afsAuth);
        this.setUserData(userdata.user.uid,userdata.user.email);
        resolve(userdata);
      },
      err => reject(err));
    });
    /*return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`,
      { email: email, password: password, returnSecureToken: true }
    )
    .pipe(tap(this.setUserData.bind(this)));*/
  }
  signup(email: string, password: string) {
    return new Promise((resolve,reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email,password)
      .then(userData => {
        resolve(userData),
        this.updateUserData(userData.user);
      }).catch(err => console.log(reject(err)));
    });
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`,
        { email, password, returnSecureToken: true }
        //pipe se ejecuta luego de subscribe
      )
      .pipe(tap(this.setUserData.bind(this)));
  }
  private updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface ={
      id: user.uid,
      email:user.email,
      roles: {
        editor: true
      }
    };
    return userRef.set(data, {merge: true});
  }
  isAuth(){
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    Plugins.Storage.remove({ key: 'authData' });
  }
  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }
  private setUserData(id: string, email: string) {
    // en set user data finalmente estamos subscribiendo al cliente.

    const user = new User(
        id,
        email,
    );
    this._user.next(user);
    // this.autoLogout(user.tokenDuration);
   this.storeAuthData(
      id,
      // userData.idToken,
      // expirationDate.toISOString(),
      email
    );
  }
  private storeAuthData(
    userId: string,
    // token: string,
    // tokenExpirationDate: string,
    email: string
  ) {
    const data = JSON.stringify({
      userId,
      // token,
      // tokenExpirationDate,
      email,
    });
    Plugins.Storage.set({
      key: 'authData',
      value: data,
    });
  }
}
