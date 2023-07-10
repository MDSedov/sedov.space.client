import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import { environment } from 'src/environments/environment';
import {TaskService} from "../services/task.service";

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
  taskCorrectAnswer: Array<any>;
  taskRequestAnswer: Array<any>;

  taskForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {

      this.getLessonById(params['id']).subscribe(response => {
        this.lesson = response;
      });

      this.getAllTasksByLesson(params['id']).subscribe(tasks => {
        this.tasks = tasks;
      });
    });

    this.taskForm = new FormGroup({
      id: new FormControl(null),
      answer: new FormControl(null)
    });
  }

  getLessonById(id: number): Observable<LessonInterface> {
    return this.http.get<LessonInterface>( environment.apiURL + "/api/lesson/" + id);
  }

  getAllTasksByLesson(id: number): Observable<TaskInterface[]> {
    return this.taskService.getAllTasksByLesson(id);
  }

  taskCheck():void {
    this.taskService.taskCheck(this.taskForm.value).subscribe(
      (response) => {
        this.taskRequestAnswer = response.body.taskRequestAnswer[1];
        this.taskCorrectAnswer = response.body.taskCorrectAnswer;
        console.log(this.taskRequestAnswer);
      },
      (error: {[key: string]: any}) => {
        console.log(error);
      }
    )
  }
}
