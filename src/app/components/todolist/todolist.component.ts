import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import {BrowserModule} from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from '../../registration/registration';
import { RegistrationService } from '../../registration/registration.service';
import { AuthService } from '../../auth/auth.service';
import { Environment } from '../../shared/environment';
import { TodoService } from './todolist.service';


@Component({
  selector: 'todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  providers: [TodoService],
  animations: [
      trigger ('fade', [

      transition(':enter', [
        style({ opacity: 0, transform:'translateY(30px)' }),
        animate(1000, style({ opacity: 1, transform:'translateY(0px)' }))
      ]),

      transition(':leave', [
        animate(1000, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]), 
      
    ])
  ]
  })

export class TodolistComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  newTodo: FormGroup;
  // is_completed: FormGroup
  user_id: number;
  todo: Todo;
  // editing: boolean;
  totalAngularPackages

  // readonly ROOT_URL = 'http://localhost:3000/';
  constructor(
    private environment: Environment,
    private http: HttpClient, 
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private todoService: TodoService,
    public authService: AuthService
    ) { 
      
    }

  ngOnInit(): void {
    this.newTodo = this.fb.group({
      todoTitle: [ '', {validators: [Validators.required]} ],
    });
    this.filter = 'all';
    this.beforeEditCache = '';
    // this.idForTodo = 4;
    this.todoTitle = '';
    this.todos = [
      
      {
        'user_id': 1,
        'id': 1,
        'title': 'learn angular',
        'is_completed': false,
        'editing': false
      },
     
    ];
    this.getTodos()
  }

      
  getTodos(): void {
    this.todoService.getTodo()
    .subscribe((todos: Todo[]) => {
      todos.forEach((todo: Todo) => this.todos.push(todo))
    })
  }

  addTodo(): void {
    if(this.todoTitle !== null) {
    }
    // this.idForTodo++;
    const formModel = this.newTodo.value;
    const saveTodo = this.todo = {
      title: formModel.todoTitle
      // idForTodo: todo.id
    }
    // this.totalAngularPackages = data.total )
    this.todoService.register(saveTodo).subscribe(
      (response: Todo) => {
        this.todos.push({
          id: response.id,
          title: response.title
        })
        this.snackBar.open('Todo successfully created', null, {
          panelClass: ['snackbar-success'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: this.environment.snackBarTimeout
        });
      }) 
    }
  logout(): void {
    this.authService.logout();
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if(todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    } 
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
      todo.title = this.beforeEditCache;
      todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todoService.deleteTodo(id).subscribe(); 
    this.snackBar.open('Nice work, todo marked as completed', null, {
      panelClass: ['snackbar-warn'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.environment.snackBarTimeout
    })
}
  remaining(): number {
    return this.todos.filter(todo => !todo.is_completed).length
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.is_completed).length > 0 ;
  }
  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.is_completed);
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.is_completed = (<HTMLInputElement>event.target).checked)
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos
    } else if(this.filter ==='active'){
      return this.todos.filter(todo => !todo.is_completed)
    } else if (this.filter ==='completed'){
      return this.todos.filter(todo => todo.is_completed)
    }
    return this.todos
  }

}
