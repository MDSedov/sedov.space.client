import {Component, Injectable, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../../models/task";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
@Injectable()
export class TaskComponent implements OnInit {

  tasks: Array<Task>;
  taskCorrectAnswer: Array<any>;
  taskRequestAnswer: Array<any>;
  taskAnswer: boolean;
  taskForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getAllTasksByLesson(params['id']);
    });

    this.taskForm = new FormGroup({
      id: new FormControl(null),
      answer: new FormControl(null)
    });
  }

  getAllTasksByLesson(id: number): void {
    this.taskService.getAllTasksByLesson(id).subscribe(response => {
      this.tasks = response.body;
      console.log(this.tasks);
    });
  }

  taskCheck():void {
    this.taskService.taskCheck(this.taskForm.value).subscribe(
      response => {
        // this.taskRequestAnswer = response.body.responseObject;
        // this.taskCorrectAnswer = response.body.responseObject;
        // this.taskAnswer = response.body.responseObject.taskAnswer;
        console.log(response);
        // console.log(this.taskAnswer);
      },
      (error: {[key: string]: any}) => {
        console.log(error);
      }
    )
  }

}
