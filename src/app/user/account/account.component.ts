import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {User} from "../../models/user";
import {UserInfo} from "../../models/user-info";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user:User;
  userInfo:UserInfo;
  personalDataForm:FormGroup;
  changeEmailForm:FormGroup;
  changePasswordForm:FormGroup;

  constructor(private userService:UserService,
              private formBuilder:FormBuilder,
              private router:Router,
              private mainLayout:MainLayoutComponent) {}

  ngOnInit(): void {
    if (!this.userService.isLogged()) {
      this.router.navigate(["/user/auth"]);
    }
    this.getCurrentUser();
    this.personalDataForm = this.formBuilder.group({
      'firstName': ['', []],
      'lastName': ['', []],
      'patronymicName': ['', []]
    });
    this.changeEmailForm = this.formBuilder.group({
      'email': [['', [Validators.email, Validators.required]]]
    });
    this.changePasswordForm = this.formBuilder.group({
      'password': ['', [Validators.minLength(8), Validators.required]],
      'confirmationPassword': ['', [Validators.minLength(8), Validators.required]]
    });
  }

  getCurrentUser() {
    this.user = this.userService.getCurrentUser();

  }

  signout():void {
    this.userService.signout().subscribe();
    this.mainLayout.ngOnInit();
  }

  changePersonalData() {
    this.userService.changePersonalData(this.personalDataForm.value).subscribe(
      (response) => {
        if (response.body.responseCode == 'OK') {
          this.user = response.body.responseObject;
          this.userService.setCurrentUser(this.user);
          this.userInfo = {
            header: 'Данные обновлены',
            message: "Персональные данные обновлены",
            showButton: true,
            buttonTitle: "Перейти в настройки",
            buttonRouter: "/user/account"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"]);
        } else {
          this.userInfo = {
            header: 'Данные не обновлены',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Перейти в настройки",
            buttonRouter: "/user/account"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"]);
        }
      },
      (error: {[key: string]: any}) => {
        console.log(error);
      }
    )
  }

  changeEmail() {
    this.userService.changeEmail(this.changeEmailForm.value).subscribe(
      (response) => {
        if (response.body.responseCode == 'OK') {
          this.user = response.body.responseObject;
          this.userService.setCurrentUser(this.user);
          this.userInfo = {
            header: 'Письмо отправлено',
            message: "На новый адрес электронной почты отправлено письмо со ссылкой для подтверждения. Перейдите по ссылке из письма для изменения адреса электронной почты.",
            showButton: true,
            buttonTitle: "Перейти в настройки",
            buttonRouter: "/user/account"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"]);
        } else {
          this.userInfo = {
            header: 'Ошибка при обновлении адреса электронной почты',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Перейти в настройки",
            buttonRouter: "/user/account"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"]);
        }
      },
      (error: {[key: string]: any}) => {
        console.log(error);
      }
    )
  }

  changePassword() {
    this.userService.changePassword(this.changePasswordForm.value).subscribe(
      (response) => {
        if (response.body.responseCode == 'OK') {
          this.signout();
          this.userInfo = {
            header: 'Пароль обновлен',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Войти в личный кабинет",
            buttonRouter: "/user/signin"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"]);
        } else {
          this.userInfo = {
            header: 'Ошибка при обновлении пароля',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Перейти в настройки",
            buttonRouter: "/user/account"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"]);
        }
      },
      (error: {[key: string]: any}) => {
        console.log(error);
      }
    )
  }

}
