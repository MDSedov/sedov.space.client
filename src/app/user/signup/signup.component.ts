import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {UserInfo} from "../../models/user-info";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  user:User;
  userInfo:UserInfo;

  constructor(public userService:UserService,
              private mainLayout:MainLayoutComponent,
              private formBuilder:FormBuilder,
              private router:Router,
              private route: ActivatedRoute,
              private http:HttpClient) {
    this.signupForm = this.formBuilder.group({
      'email': ['', [Validators.email, Validators.required]],
      'password': ['', [Validators.minLength(8), Validators.required]],
      'confirmationPassword': ['', [Validators.minLength(8), Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.userService.isLogged()) {
      this.router.navigate(["/user/account"]);
    };
  }

  signup():void {
    this.userService.signup(this.signupForm.value).subscribe(
      (response) => {
        if (response.body.responseMessage == 'SIGNUP_SUCCESS') {
          this.userInfo = {
            header: 'Личный кабинет создан',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Отправить новое письмо",
            buttonRouter: "/user/email"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"])
        } else if (response.body.responseMessage == 'UNKNOWN_PROBLEM') {
          this.userInfo = {
            header: 'Неизвестная ошибка',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Попробовать еще раз",
            buttonRouter: "/user/signup"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"])
        } else {
          this.userInfo = {
            header: 'Регистрация не удалась',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Попробовать еще раз",
            buttonRouter: "/user/signup"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"])
        }
      },
      (error: {[key: string]: any}) => {
        console.log(error);
      }
    )
  }

  getTempEmail():string {
    return this.userService.getTempEmail();
  }

  setTempEmail(tempEmail:string):void {
    this.userService.setTempEmail(tempEmail);
  }

}
