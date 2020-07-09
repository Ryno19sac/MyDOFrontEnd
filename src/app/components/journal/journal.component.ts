import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Environment } from '../../shared/environment';
import {MatButtonModule} from '@angular/material/button';
import { JournalService } from './journal.service';
import { Journal } from '../../interfaces/journal';


@Component({
  selector: 'MyDO-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  providers: [JournalService],
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

export class JournalComponent implements OnInit {
  entries: Journal[];
  entryTitle: string;
  idForEntry: number;
  beforeEditCache: string;
  filter: string;
  newEntry: FormGroup;
  user_id: number;
  entryDate: string;
  entry: Journal

  constructor(private environment: Environment,
    private http: HttpClient, 
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private journalService: JournalService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.newEntry = this.fb.group({
      entry: ['', { validators: [Validators.required]} ],
      entryDate: [ '', { validators: [Validators.required]} ],
    });
    // this.idForEntry = 4;
    this.entryTitle = ''
    this.beforeEditCache = ''
    this.filter = 'all'
    this.entries = []
    this.getEntries()
    
  }

  getEntries(): void {
    this.journalService.getEntry()
    .subscribe((entries: Journal[]) => {
      entries.forEach((entry: Journal) => this.entries.push(entry))
    })
  }
  addEntry(): void {
    if(this.entryTitle !== null) {
      // this.idForEntry++;
      const formModel = this.newEntry.value;
      const saveEntry = this.entry = {
        entry: formModel.entry,
        entryDate: formModel.entryDate
      }
      this.journalService.register(saveEntry).subscribe(
        (response: Journal) => {
          console.log('this is', response)
            this.entries.push({
              // id: response.id,
              entry: response.entry,
              entryDate: response.entryDate
            })
          this.snackBar.open('Journal entry successfully saved', null, {
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: this.environment.snackBarTimeout
          })
        })
    }

  }
  logout(): void {
    this.authService.logout();
  }

  deleteEntry(id: number): void {
    this.entries = this.entries.filter(entry => entry.id !== id);
    this.journalService.deleteEntry(id).subscribe();
    this.snackBar.open('Journal Entry deleted', null, {
      panelClass: ['snackbar-warn'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.environment.snackBarTimeout
    })
  }
}
