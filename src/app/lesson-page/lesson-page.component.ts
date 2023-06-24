import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {response} from "express";
import {EnvironmentService} from "../services/environment.service";
import { environment } from 'src/environments/environment';

export interface LessonInterface {
  id: number,
  number: number,
  title: string,
  text: string,
  time: string,
  complexity: number
}

export interface TaskInterface {
  id: number,
  lesson_id: number,
  module_id: number,
  number: number,
  type: string,
  title: string,
  text: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  answer: string,
  complexity: number
}

export interface TaskCheck {
  result: string
}

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LessonPageComponent implements OnInit {

  lesson: LessonInterface;
  tasks: TaskInterface[];
  taskCheck: string;

  taskForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.taskCheck = "";
    this.route.params.subscribe((params: Params) => {

      this.getLessonById(params['id']).subscribe(response => {
        this.lesson = response;
      });

      this.getAllTasksByLesson(params['id']).subscribe(tasks => {
        this.tasks = tasks;
      });

      this.taskForm = new FormGroup({
        answer: new FormControl(null)
      });
    });
  }

  getLessonById(id: number): Observable<LessonInterface> {
    return this.http.get<LessonInterface>( environment.apiURL + "/api/lesson/" + id);
  }

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

  checkTask(id: number): void {
    this.http.post<TaskCheck>(environment.apiURL + "/api/task/" + id + "/check", this.taskForm.value)
      .subscribe(response => {
        this.taskCheck = response.result;
      });
  }
}
