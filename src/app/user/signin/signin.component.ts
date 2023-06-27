import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {UserInfo} from "../../models/user-info";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm:FormGroup;
  user:User;
  userInfo:UserInfo;

  constructor(public userService:UserService,
              private mainLayout:MainLayoutComponent,
              private formBuilder:FormBuilder,
              private router:Router,
              private route: ActivatedRoute,
              private http:HttpClient) {
    this.signinForm = this.formBuilder.group({
      'email': ['', [Validators.email, Validators.required]],
      'password': ['', [Validators.minLength(8), Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.userService.isLogged()) {
      this.router.navigate(["/user/account"]);
    };
  }

  signin():void {
    this.userService.signin(this.signinForm.value).subscribe(
      (response) => {
        if (response.body.responseMessage == 'SIGNIN_SUCCESS') {
          this.user = response.body.responseObject;
          this.userService.setCurrentUser(this.user);
          this.mainLayout.ngOnInit();
          this.router.navigate(["/user/account"])
        } else if (response.body.responseMessage == 'SIGNIN_FAILED') {
          this.userInfo = {
            header: 'Войти не удалось',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Попробовать еще раз",
            buttonRouter: "/user/signin"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"])
        } else {
          // this.dynamicWindow = {
          //   header: 'Неизвестная ошибка',
          //   message: response.body.responseObject,
          //   showButton: true,
          //   buttonTitle: "Попробовать еще раз",
          //   buttonShowPage: "signinForm"
          // };
          // this.showPage = "dynamicWindow";
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
