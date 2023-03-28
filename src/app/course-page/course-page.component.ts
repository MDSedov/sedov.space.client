import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface CourseInterface {
  id: number,
  number: number,
  title: string,
  level: number,
  text: string
}

export interface ModuleInterface {
  id: number,
  number: number,
  title: string,
  text: string,
  time: string
}

export interface LessonInterface {
  id: number,
  module: ModuleInterface,
  number: number,
  title: string,
  text: string,
  time: string
}

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  course: CourseInterface;
  modules: ModuleInterface[];
  lessons: LessonInterface[];

  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.http.get<CourseInterface>(environment.apiURL + "/api/courses/1")
        .subscribe(response => {
          this.course = response;
        })
    });

    this.getAllModulesByCourse().subscribe(modules => {
      this.modules = modules;
      console.log(this.modules);
    });

    this.getAllLessonsByCourse().subscribe(lessons => {
      this.lessons = lessons;
      console.log(this.lessons);
    });

  }

  getAllModulesByCourse(): Observable<ModuleInterface[]> {
    return this.http.get(environment.apiURL + "/api/courses/1/modules")
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }))
      }))
  }

  getAllLessonsByCourse(): Observable<LessonInterface[]> {
    return this.http.get(environment.apiURL + "/api/courses/1/lessons")
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: Number(key) + 1
          }))
      }))
  }

}
