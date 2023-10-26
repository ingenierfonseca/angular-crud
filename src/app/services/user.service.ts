import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, UserCredential } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private STORAGE_TOKEN_PARAM: string = 'token';
  private loggedIn = new Subject<boolean>();

  constructor(private auth: Auth) { }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  setLoggedIn(resp: UserCredential) {
    localStorage.setItem(this.STORAGE_TOKEN_PARAM, resp.user.refreshToken);
    this.loggedIn.next(true);
  }

  setLoggedOut() {
    localStorage.removeItem(this.STORAGE_TOKEN_PARAM);
    this.loggedIn.next(false);
  }

  getLoggedIn() {
    return localStorage.getItem(this.STORAGE_TOKEN_PARAM) != null;
  }

  checkLoggedIn() {
    console.log("storage:", localStorage.getItem(this.STORAGE_TOKEN_PARAM));
    if (localStorage.getItem(this.STORAGE_TOKEN_PARAM) != null) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }
}
