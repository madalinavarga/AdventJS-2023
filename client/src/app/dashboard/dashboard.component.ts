import { Component, OnInit } from '@angular/core';
import { EventApiService } from '../eveniment/services/event-api.service';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { EventResponse } from '../eveniment/models/EventResponse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardCardComponent, FontAwesomeModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  events$: Observable<EventResponse[]> = of([]);
  addIcon = faAdd;

  constructor(private eventApiService: EventApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.events$ = this.eventApiService.getOwnerEvents();
  }

  refetch() {
    this.events$ = this.eventApiService.getOwnerEvents();
  }

  handleAddEvent() {
    this.router.navigate(['/event']);
  }
}
