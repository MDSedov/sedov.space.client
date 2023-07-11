import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getAllTasksByLesson(id: number): Observable<any> {
    return this.http.get(environment.apiURL + "/api/lesson/" + id + "/tasks", {
      observe: "response"
    }).pipe(
      map((response: {[key: string]: any}) => {
        return response;
      })
    )  }

  taskCheck(task:Task):Observable<any> {
    return this.http.post(environment.apiURL + "/api/task/" + task.id + "/check", task, {
      observe: "response",
    }).pipe(
      map((response: {[key: string]: any}) => {
        return response;
      })
    )
  }
}
