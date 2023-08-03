import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  taskTestResponse: string;
  taskRequestResponse: string;
  taskTestErrorMessage: string;
  taskRequestErrorMessage: string;
  taskCorrectAnswer: Array<any>;
  taskRequestAnswer: Array<any>;
  taskTestSuccess: boolean;
  taskRequestSuccess: boolean;
  taskTestForm: FormGroup;
  taskRequestForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private formBuilder:FormBuilder,
              private http: HttpClient) {
    this.taskTestForm = this.formBuilder.group({
      'id': ['', []],
      'answer': ['', [Validators.minLength(1), Validators.required]]
    });

    this.taskRequestForm = this.formBuilder.group({
      'id': ['', []],
      'answer': ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getAllTasksByLesson(params['id']);
    });
  }

  getAllTasksByLesson(id: number): void {
    this.taskService.getAllTasksByLesson(id).subscribe(response => {
      this.taskTestResponse = response.body.responseMessage;
      this.tasks = response.body;
    });
  }

  taskRequestCheck():void {
    this.taskService.taskCheck(this.taskRequestForm.value).subscribe(
      response => {
        if (response.body.responseMessage == "OK") {
          this.taskRequestResponse = response.body.responseMessage;
          this.taskRequestAnswer = JSON.parse(response.body.responseObject).taskRequestAnswer;
          this.taskCorrectAnswer = JSON.parse(response.body.responseObject).taskCorrectAnswer;
          this.taskRequestSuccess = JSON.parse(response.body.responseObject).taskSuccess;
        } else {
          this.taskRequestResponse = response.body.responseMessage;
          this.taskRequestErrorMessage = response.body.responseObject;
        }
      },
      (error: {[key: string]: any}) => {
        console.log(error);
      }
    )
  }

  taskTestCheck():void {
    this.taskService.taskCheck(this.taskTestForm.value).subscribe(
      response => {
        if (response.body.responseMessage == "OK") {
          this.taskTestResponse = response.body.responseMessage;
          this.taskTestSuccess = response.body.taskSuccess;
        } else {
          this.taskTestErrorMessage = response.body.responseObject;
        }
      },
      (error: {[key: string]: any}) => {
        console.log(error);
      }
    )
  }

}
