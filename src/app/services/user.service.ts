import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {catchError, map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import {isBoolean} from "util";
import {MainLayoutComponent} from "../shared/components/main-layout/main-layout.component";
import {UserInfo} from "../models/user-info";

@Injectable()
export class UserService {
  user:User;
  tempEmail:string;
  userInfo:UserInfo;

  constructor(private http:HttpClient) {
  }

  getTempEmail() {
    return this.tempEmail;
  }

  getUserInfo() {
    return this.userInfo;
  }

  setTempEmail(tempEmail:string) {
    this.tempEmail = tempEmail;
  }

  setUserInfo(userInfo:UserInfo) {
    this.userInfo = userInfo;
  }

  findAccount(user:User):Observable<any> {
    return this.http.post(environment.apiURL + "/api/user/find/account", user, {
      observe: "response"
    }).pipe(
      map((response: {[key: string]: any}) => {
        return response;
      })
    )
  }

  sendConfirmationEmail(user:User):Observable<any> {
    return this.http.post(environment.apiURL + "/api/user/send/email", user, {
      observe: "response",
    }).pipe(
      map((response: {[key: string]: any}) => {
        return response;
      })
    )
  }

  getCurrentUser():User {
    this.user = new User();
    this.user.email = localStorage.getItem('email') as string;

    this.user.firstName = localStorage.getItem('firstName') as string;
    if (this.user.firstName == "null") {
      this.user.firstName = "";
    }

    this.user.lastName = localStorage.getItem('lastName') as string;
    if (this.user.lastName == "null") {
      this.user.lastName = "";
    }

    this.user.patronymicName = localStorage.getItem('patronymicName') as string;
    if (this.user.patronymicName == "null") {
      this.user.patronymicName = "";
    }

    return this.user;
  }

  setCurrentUser(user:User):void {
    localStorage.setItem('email', user.email as string);
    localStorage.setItem('firstName', user.firstName as string);
    localStorage.setItem('lastName', user.lastName as string);
    localStorage.setItem('patronymicName', user.patronymicName as string);
  }

  clearCurrentUser():void {
    localStorage.clear();
  }

  isLogged():boolean {
    if (this.getCurrentUser().email != null) {
      return true;
    } else {
      return false;
    }
  }

  signin(user:User):Observable<any> {
    return this.http.post(environment.apiURL + "/api/user/signin/", user, {
      observe: "response",
      withCredentials: true
    }).pipe(
      map((response: {[key: string]: any}) => {
        return response;
      })
    )
  }

  signup(user:User):Observable<any> {
    return this.http.post(environment.apiURL + "/api/user/signup/", user, {
      observe: "response",
      withCredentials: true
    }).pipe(
      map((response: {[key: string]: any}) => {
        return response;
      })
    )
  }

  signout():Observable<any> {
    this.clearCurrentUser();
    return this.http.get(environment.apiURL + "/api/user/signout/", {
      observe: "response",
      withCredentials: true
    }).pipe(
        map((response: {[key: string]: any}) => {
          return response;
        })
      )
  }

  changePersonalData(user:User):Observable<any> {
    return this.http.post(environment.apiURL + "/api/user/change/data", user, {
      observe: "response",
      withCredentials: true
    }).pipe(
      map((response: {[key: string]: any}) => {
        return response;
      })
    )
  }

  changeEmail(user:User):Observable<any> {
    return this.http.post(environment.apiURL + "/api/user/change/email", user, {
      observe: "response",
      withCredentials: true
    }).pipe(
      map((response: {[key: string]: any}) => {
        return response;
      })
    )
  }

  changePassword(user:User):Observable<any> {
    return this.http.post(environment.apiURL + "/api/user/change/password", user, {
      observe: "response",
      withCredentials: true
    }).pipe(
      map((response: {[key: string]: any}) => {
        return response;
      })
    )
  }

  confirmationEmail(token:String):Observable<any> {
    return this.http.get(environment.apiURL + "/api/user/email/confirmation/" + token, {
      observe: "response",
      withCredentials: true
    }).pipe(
      map((response: {[key: string]: any}) => {
        return response;
      })
    )
  }

  // recoverPassword(user:User):Observable<any> {
  //   return this.http.post(environment.apiURL + "/api/user/find/", user, {
  //     observe: "response"
  //   }).pipe(
  //     map((response: {[key: string]: any}) => {
  //       return response;
  //     })
  //   )
  // }
}
