import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  selector: 'MyOD-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    
      // this.newsService.getNews
    
  }

}
