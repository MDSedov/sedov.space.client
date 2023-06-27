import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Response} from "../../models/response";
import {HttpClient} from "@angular/common/http";
import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {UserInfo} from "../../models/user-info";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
@Injectable()
export class AuthenticationComponent implements OnInit {
  showPageForm:FormGroup;
  emailForm:FormGroup;
  signinEmailForm:FormGroup;
  signupForm:FormGroup;
  signupEmailForm:FormGroup;
  user:User;
  responseMessage:Response<User>;
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
    if (this.userService.isLogged()) {
      this.router.navigate(["/user/account"]);
    };
  }

  findAccount():void {
    this.setTempEmail(this.emailForm.controls['email'].value);
    this.userService.findAccount(this.emailForm.value).subscribe(
      (response) => {
        if (response.body.responseMessage == 'USER_FOUND') {
          this.router.navigate(["/user/signin"]);
        } else if (response.body.responseMessage == 'USER_NOT_FOUND') {
          this.router.navigate(["/user/signup"]);
        }
        // } else {
        //   this.dynamicWindow = {
        //     header: 'Неизвестная ошибка',
        //     message: response.body.responseObject,
        //     showButton: true,
        //     buttonTitle: "Попробовать еще раз",
        //     buttonShowPage: ""
        //   };
        //   this.router.navigate(["/user/dynamic-window"]);
        // }
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
