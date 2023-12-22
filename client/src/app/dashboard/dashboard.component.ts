import { Component, OnInit } from '@angular/core';
import { EventApiService } from '../eveniment/services/event-api.service';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { EventResponse } from '../eveniment/models/EventResponse';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  events : EventResponse[] =[];

  constructor(private _eventApiService: EventApiService){

  }

  ngOnInit(): void {
      this._eventApiService.getOwnerEvents().subscribe({
        next:(response)=>{
          console.log("Dashboard - Events fetched successfully");
          console.log(response)
          this.events= response;
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }
}
