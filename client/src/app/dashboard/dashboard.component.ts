import { Component, OnInit } from '@angular/core';
import { EventApiService } from '../eveniment/services/event-api.service';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { EventResponse } from '../eveniment/models/EventResponse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardCardComponent, FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  events: EventResponse[] = [];
  addIcon = faAdd;

  constructor(private eventApiService: EventApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.eventApiService.getOwnerEvents().subscribe({
      next: (response) => {
        this.events = response;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  handleAddEvent() {
    this.router.navigate(['/event']);
  }
}
