import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {TaskInterface} from "../lesson-page/lesson-page.component";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getAllTasksByLesson(id: number): Observable<TaskInterface[]> {
    return this.http.get(environment.apiURL + "/api/lesson/" + id + "/tasks")
      .pipe(map((response: {[key: string]: any}) => {
        console.log(response);
        return Object
          .keys(response)
          .map(key => ({
            ...response[key]
          }))
      }))
  }

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
