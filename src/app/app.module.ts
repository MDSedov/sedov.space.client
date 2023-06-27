import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {CoursePageComponent} from './course-page/course-page.component';
import {LessonPageComponent} from './lesson-page/lesson-page.component';
import {SanitizedHtmlPipe} from './pipes/sanitized-html.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountComponent} from './user/account/account.component';
import {CookieService} from 'ngx-cookie-service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserService} from './services/user.service';
import {AuthenticationComponent} from './user/authentication/authentication.component';
import {AuthenticationInterceptor} from "./interceptors/AuthenticationInterceptor";
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { ConfirmationComponent } from './user/confirmation/confirmation.component';
import { InfoComponent } from './user/info/info.component';
import { EmailComponent } from './user/email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    CoursePageComponent,
    LessonPageComponent,
    SanitizedHtmlPipe,
    AccountComponent,
    AuthenticationComponent,
    SigninComponent,
    SignupComponent,
    ConfirmationComponent,
    InfoComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
