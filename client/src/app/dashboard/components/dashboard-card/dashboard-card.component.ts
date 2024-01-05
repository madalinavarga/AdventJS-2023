import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventResponse } from '../../../eveniment/models/EventResponse';
import { DateCountdownPipe } from '../../../common/utils/date-countdown-pipe.pipe';
import { Router } from '@angular/router';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditEventComponent } from '../../../eveniment/components/edit-event/edit-event.component';
import { EventApiService } from '../../../eveniment/services/event-api.service';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [DateCountdownPipe, FontAwesomeModule, EditEventComponent],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent {
  @Input() event: EventResponse | null = null;
  @Output() changedEvent = new EventEmitter<void>();
  editIcon = faEdit;
  deleteIcon = faRemove;
  isOpen = false;

  constructor(private router: Router, private eventApiService: EventApiService) { }

  goToEvent(id: string | undefined) {
    this.router.navigate([`/event/${id}/invite`]);
  }

  handleEditEvent() {
    this.isOpen = !this.isOpen;
  }

  changeEventDetails(event: EventResponse) {
    this.event = event;
  }

  handleRemoveEvent() {
    this.eventApiService.remove(this.event?.id!).subscribe({
      next: () => {
       this.changedEvent.next();
      }
    })
  }
}
