import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable, throwError} from "rxjs";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private userService:UserService,
    private router:Router) {
  }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    const clonedRequest =
      request.clone(
        {withCredentials: true}
      );
    return next.handle(clonedRequest)
      .pipe(
        map((event:HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log("Http Response event... " + event.status);
          } else {
            console.log("no http response");
          }
          return event;
        }),
        catchError(error => {
          console.log("Error response status: ", error.status);
          if (error.status === 401) {
            this.userService.clearCurrentUser();
            this.router.navigateByUrl("/login");
          }
          return throwError(error);
        })
      );
  }
}
