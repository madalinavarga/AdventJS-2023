import { Component, Input } from '@angular/core';
import { EventResponse } from '../../../eveniment/models/EventResponse';
import { DatePipe } from '@angular/common';
import { DateCountdownPipe } from '../../../eveniment/utils/date-countdown-pipe.pipe';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [DatePipe, DateCountdownPipe, FontAwesomeModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent {

  @Input() event: EventResponse | null = null;
  editIcon = faEdit;

  constructor(private _router: Router) { }

  goToEvent(id: string | undefined) {
    this._router.navigate([`/event/${id}/invite`]);
  }

}
