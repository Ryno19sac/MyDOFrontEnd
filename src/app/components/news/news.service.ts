import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) { }
  // newsURL = 'http://newsapi.org/v2/top-headlines?' +
  // 'country=us&' + '06369854ab6d4c848f2fbadc4abbc181'
  // news = []
  // getNews(): Observable<NewsService[]> {
  //   this.http.get(this.newsURL)
  //   // return news
  // } 
}
