import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../../models/user-info";
import {User} from "../../models/user";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  emailForm:FormGroup;
  user:User;
  userInfo:UserInfo;

  constructor(private userService:UserService,
              private mainLayout:MainLayoutComponent,
              private formBuilder:FormBuilder,
              private router:Router,
              private route: ActivatedRoute,
              private http:HttpClient) {
    this.emailForm = this.formBuilder.group({
      'email': ['', [Validators.email, Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  sendEmail() {
    this.setTempEmail(this.emailForm.controls['email'].value);
    this.userService.sendConfirmationEmail(this.emailForm.value).subscribe(
      (response) => {
        if (response.body.responseMessage == 'EMAIL_SENT_SUCCESSFULLY') {
          this.userInfo = {
            header: 'Письмо отправлено',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Отправить новое письмо",
            buttonRouter: "/user/email"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"]);
        } else if (response.body.responseMessage == 'USER_NOT_FOUND') {
          this.userInfo = {
            header: 'Кабинет не найден',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Отправить новое письмо",
            buttonRouter: "/user/email"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"]);
        } else {
          this.userInfo = {
            header: 'Неизвестная проблема',
            message: response.body.responseObject,
            showButton: true,
            buttonTitle: "Отправить новое письмо",
            buttonRouter: "/user/email"
          };
          this.userService.setUserInfo(this.userInfo);
          this.router.navigate(["/user/info"]);
        }
      });
  }

  getTempEmail():string {
    return this.userService.getTempEmail();
  }

  setTempEmail(tempEmail:string):void {
    this.userService.setTempEmail(tempEmail);
  }

}
