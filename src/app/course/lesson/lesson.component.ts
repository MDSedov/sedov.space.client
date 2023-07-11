import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

export interface LessonInterface {
  id: number,
  number: number,
  title: string,
  text: string,
  time: string,
  complexity: number
}

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LessonComponent implements OnInit {

  lesson: LessonInterface;

  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getLessonById(params['id']).subscribe(response => {
        this.lesson = response;
      });
    });
  }

  getLessonById(id: number): Observable<LessonInterface> {
    return this.http.get<LessonInterface>( environment.apiURL + "/api/lesson/" + id);
  }
}
