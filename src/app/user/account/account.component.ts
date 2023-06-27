import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {User} from "../../models/user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user:User;
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
    this.router.navigate(["/user/auth"]);
  }

  changePersonalData() {
    this.userService.changePersonalData(this.personalDataForm.value).subscribe(
      (response) => {
        if (response.body.responseCode == 'OK') {
          this.userService.setCurrentUser( response.body.responseObject );
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
          this.userService.setCurrentUser( response.body.responseObject );
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
        }
      },
      (error: {[key: string]: any}) => {
        console.log(error);
      }
    )
  }

}
