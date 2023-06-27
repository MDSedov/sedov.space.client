import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserInfo} from "../../models/user-info";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  userInfo:UserInfo;

  constructor(private userService:UserService,
              private mainLayout:MainLayoutComponent,
              private formBuilder:FormBuilder,
              private router:Router,
              private route: ActivatedRoute,
              private http:HttpClient) { }

  ngOnInit(): void {
    this.userInfo = this.getUserInfo();
    if (!this.userInfo) {
      this.router.navigate(["user/auth"]);
    }
  }

  getUserInfo():UserInfo {
    return this.userService.getUserInfo();
  }

  buttonClick():void {
    this.router.navigate([this.userInfo.buttonRouter])
  }

}
