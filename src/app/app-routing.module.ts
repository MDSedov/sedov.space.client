import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {CoursePageComponent} from "./course-page/course-page.component";
import {LessonPageComponent} from "./lesson-page/lesson-page.component";
import {AccountComponent} from "./user/account/account.component";
import {AuthenticationComponent} from "./user/authentication/authentication.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'course/:id', component: CoursePageComponent},
      {path: 'lesson/:id', component: LessonPageComponent},
      {path: 'user/auth', component: AuthenticationComponent},
      {path: 'user/auth/email/confirmation/:token', component: AuthenticationComponent},
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
