import { Component, Input } from '@angular/core';
import { EventResponse } from '../../../eveniment/models/EventResponse';
import { InvitationsResponse } from '../../models/InviteResponse';
import { DatePipe } from '@angular/common';
import { ConvertStatusPipe } from '../../../common/utils/convert-status.pipe';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InviteApiService } from '../../services/invite-api.service';

@Component({
  selector: 'app-invite-card',
  standalone: true,
  imports: [DatePipe, ConvertStatusPipe, FontAwesomeModule],
  templateUrl: './invite-card.component.html',
  styleUrl: './invite-card.component.css'
})
export class InviteCardComponent {
  acceptIcon = faThumbsUp;
  rejectIcon = faThumbsDown;
  @Input() inviteDetails: InvitationsResponse | null = null;

  private _eventDetails: EventResponse | null = null;
  @Input() set eventDetails(eventDetails: EventResponse | null) {
    this._eventDetails = eventDetails;
  }

  get eventDetails(): EventResponse | null {
    return this._eventDetails;
  }

  constructor(private inviteApiService: InviteApiService) {

  }

  handleInitationStatus(num: number) {
    let invite: Partial<InvitationsResponse> = { status: num }
    if (this.inviteDetails?.status !== num) {
      this.inviteApiService.update(invite, this.inviteDetails?.id).subscribe({
        next: () => window.location.reload(),
        error: err => console.error('An error occurred while trying to update the status of the invitation')
      })
    }

    //change status api call
  }
}
