import { Component, OnInit } from '@angular/core';
import { Ritual } from 'apps/biblioveda/src/app/interfaces/ritual';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Environment } from '../../shared/environment';
import { RitualService } from './ritual.service';

@Component({
  selector: 'ritual',
  templateUrl: './ritual.component.html',
  styleUrls: ['./ritual.component.scss'],
  providers: [RitualService],
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

export class RitualComponent implements OnInit {
  rituals: Ritual[];
  ritualTitle: string;
  idForRitual: number;
  filter: string;
  beforeRitualEdit: string;
  newRitual: FormGroup
  ritual: Ritual

  constructor(private environment: Environment,
    private http: HttpClient, 
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ritualService: RitualService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.newRitual = this.fb.group({
      ritualTitle: [ '', {validators: [Validators.required]}]
    })
    this.beforeRitualEdit = '';
    this.filter = 'all';
    this.idForRitual = 3;
    this.ritualTitle = '';
    this.rituals = [
      // {
      //   'id': 1,
      //   'ritualTitle': '30 Minutes of Meditation',
      //   'is_completed': false,
      //   'editing': false
      // },
      // {
      //   'id': 2,
      //   'ritualTitle': '1 hour of movement',
      //   'is_completed': false,
      //   'editing': false
      // },
      // {
      //   'id': 3,
      //   'ritualTitle': 'Journal',
      //   'is_completed': false,
      //   'editing': false
      // },
    ];
    this.getRituals()
  }

  getRituals(): void{
    this.ritualService.getRitual()
      .subscribe((rituals: Ritual[]) => {
        console.log('before', this.rituals)
        rituals.forEach((ritual: Ritual) => this.rituals.push(ritual))
        console.log('after', this.rituals, rituals)
      })
  }

  logout(): void {
    this.authService.logout();
  }
  addRitual(): void {
    if(this.ritualTitle !== null) {
    }
    this.ritualTitle = '';
    this.idForRitual++;
    const formModel = this.newRitual.value;
    const saveRitual = this.ritual = {
      ritualTitle: formModel.ritualTitle
    }
    
    this.ritualService.register(saveRitual).subscribe(
      (response: Ritual) => {
        this.rituals.push({
          id: response.id,
          ritualTitle: response.ritualTitle
        })
        this.snackBar.open('Ritual successfully created', null, {
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: this.environment.snackBarTimeout
          })
        }
      )
        this.newRitual.reset()
  }

  editRitual(ritual: Ritual): void {
    this.beforeRitualEdit = ritual.ritualTitle
    ritual.editing = true;
  }

  doneRitualEdit(ritual: Ritual): void {
    if(ritual.ritualTitle.trim().length === 0) {
      ritual.ritualTitle = this.beforeRitualEdit;
    }
    ritual.editing = false;
  }


  deleteRitual(id: number): void {
    console.log('begin delete ritual')
    this.rituals = this.rituals.filter(ritual => ritual.id !== id)
    this.ritualService.deleteRitual(id).subscribe();
    this.snackBar.open('Ritual permanently deleted', null, {
      panelClass: ['snackbar-warn'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.environment.snackBarTimeout
    })
  }

  dayDeleteRitual(id: number): void {
    console.log('begin delete ritual')
    this.rituals = this.rituals.filter(ritual => ritual.id !== id)
    this.ritualService.deleteRitual(id).subscribe();
    this.snackBar.open('Nice, see you tomorrow!', null, {
      panelClass: ['snackbar-success'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.environment.snackBarTimeout
    })
  }

}
