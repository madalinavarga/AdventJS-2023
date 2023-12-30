import { Component, OnInit } from '@angular/core';
import { InviteApiService } from '../services/invite-api.service';
import { InvitationsResponse } from '../models/InviteResponse';
import { EventApiService } from '../../eveniment/services/event-api.service';
import { EventResponse } from '../../eveniment/models/EventResponse';
import { InviteCardComponent } from '../components/invite-card/invite-card.component';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StatusIconComponent } from '../../common/components/status-icon/status-icon.component';

@Component({
  selector: 'app-invitations',
  standalone: true,
  imports: [InviteCardComponent, FontAwesomeModule, StatusIconComponent],
  templateUrl: './invitations.component.html',
  styleUrl: './invitations.component.css'
})
export class InvitationsComponent implements OnInit {
  invitations: InvitationsResponse[] = [];
  eventDetails: EventResponse | null = null;
  inviteDetails: InvitationsResponse | null = null;
  barsIcon = faBarsStaggered

  constructor(private inviteApiService: InviteApiService, private eventApiService: EventApiService) {

  }

  ngOnInit(): void {
    this.inviteApiService.getAll().subscribe({
      next: (data) => {
        this.invitations = data;
      },
      error: err => {
        console.error(err)
      }
    })
  }

  handleInviteDetails(invite: InvitationsResponse) {
    this.inviteDetails = invite;
    this.eventApiService.get(invite.eventId).subscribe({
      next: data => {
        this.eventDetails = data;
      },
      error: err => {
        console.error(err)
      }
    });
  }
}
