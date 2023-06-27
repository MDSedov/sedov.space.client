import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserInfo} from "../../models/user-info";
import {User} from "../../models/user";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  user:User;
  userInfo:UserInfo;

  constructor(private userService:UserService,
              private mainLayout:MainLayoutComponent,
              private formBuilder:FormBuilder,
              private router:Router,
              private route: ActivatedRoute,
              private http:HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.confirmationEmail(params['token']);
    });
  }

  confirmationEmail(token:String):void {
    this.userService.confirmationEmail(token).subscribe(
      (response) => {
        if (response.body.responseCode == 'OK') {
          this.user = response.body.responseObject;
          this.userService.setCurrentUser(this.user);
          this.mainLayout.ngOnInit();
          this.userInfo = {
            header: 'Почта подтверждена',
            message: "Адрес электронной почты подтвержден. Вход в личный кабинет выполнен.",
            showButton: true,
            buttonTitle: "Перейти в настройки",
            buttonRouter: "/user/account"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"]);
        } else {
          this.userInfo = {
            header: 'Почта не подтверждена',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Отправить новое письмо",
            buttonRouter: "/user/email"
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
