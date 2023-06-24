import {Component, Injectable, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
@Injectable()
export class MainLayoutComponent implements OnInit {
  isLogged:boolean;
  user:User;

  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit(): void {
    this.isLogged = this.userService.isLogged();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.user = this.userService.getCurrentUser();
  }

  signout():void {
    this.userService.signout().subscribe();
    this.ngOnInit();
    this.router.navigate(["/user/auth"]);
  }

}
