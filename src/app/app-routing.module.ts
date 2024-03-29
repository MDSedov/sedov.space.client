import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {CourseComponent} from "./course/course/course.component";
import {LessonComponent} from "./course/lesson/lesson.component";
import {AccountComponent} from "./user/account/account.component";
import {AuthenticationComponent} from "./user/authentication/authentication.component";
import {SigninComponent} from "./user/signin/signin.component";
import {SignupComponent} from "./user/signup/signup.component";
import {InfoComponent} from "./user/info/info.component";
import {EmailComponent} from "./user/email/email.component";
import {ConfirmationComponent} from "./user/confirmation/confirmation.component";
import {TaskComponent} from "./course/task/task.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'course/:id', component: CourseComponent},
      {path: 'lesson/:id', component: LessonComponent},
      {path: 'user/auth', component: AuthenticationComponent},
      {path: 'user/signin', component: SigninComponent},
      {path: 'user/signup', component: SignupComponent},
      {path: 'user/info', component: InfoComponent},
      {path: 'user/email', component: EmailComponent},
      {path: 'user/confirmation/:token', component: ConfirmationComponent},
      {path: 'user/account', component: AccountComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
