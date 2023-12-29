import { Component, Input } from '@angular/core';
import { EventResponse } from '../../../eveniment/models/EventResponse';
import { InvitationsResponse } from '../../models/InviteResponse';
import { DatePipe } from '@angular/common';
import { ConvertStatusPipe } from '../../../eveniment/utils/convert-status.pipe';

@Component({
  selector: 'app-invite-card',
  standalone: true,
  imports: [DatePipe, ConvertStatusPipe],
  templateUrl: './invite-card.component.html',
  styleUrl: './invite-card.component.css'
})
export class InviteCardComponent {
  @Input() inviteDetails: InvitationsResponse | null = null;

  private _eventDetails: EventResponse | null = null;
  @Input() set eventDetails(eventDetails: EventResponse | null) {
    this._eventDetails = eventDetails;
  }

  get eventDetails(): EventResponse | null {
    return this._eventDetails;
  }

  constructor() {

  }
}
