import { Component, Input } from '@angular/core';
import { EventResponse } from '../../../eveniment/models/EventResponse';
import { DateCountdownPipe } from '../../../eveniment/utils/date-countdown-pipe.pipe';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditEventComponent } from '../../../eveniment/components/edit-event/edit-event.component';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [DateCountdownPipe, FontAwesomeModule, EditEventComponent],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent {
  @Input() event: EventResponse | null = null;
  editIcon = faEdit;
  isOpen = false;

  constructor(private _router: Router) { }

  goToEvent(id: string | undefined) {
    this._router.navigate([`/event/${id}/invite`]);
  }

  handleEditEvent() {
    this.isOpen = !this.isOpen;
  }

  changeEventDetails(event: EventResponse) {
    this.event = event;
  }
}
