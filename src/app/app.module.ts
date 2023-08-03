import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {CourseComponent} from './course/course/course.component';
import {LessonComponent} from './course/lesson/lesson.component';
import {SanitizedHtmlPipe} from './pipes/sanitized-html.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountComponent} from './user/account/account.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserService} from './services/user.service';
import {AuthenticationComponent} from './user/authentication/authentication.component';
import {AuthenticationInterceptor} from "./interceptors/AuthenticationInterceptor";
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { ConfirmationComponent } from './user/confirmation/confirmation.component';
import { InfoComponent } from './user/info/info.component';
import { EmailComponent } from './user/email/email.component';
import { TaskComponent } from './course/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    CourseComponent,
    LessonComponent,
    SanitizedHtmlPipe,
    AccountComponent,
    AuthenticationComponent,
    SigninComponent,
    SignupComponent,
    ConfirmationComponent,
    InfoComponent,
    EmailComponent,
    TaskComponent
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
