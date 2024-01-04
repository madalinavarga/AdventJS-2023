import { Component, OnInit } from '@angular/core';
import { InviteApiService } from '../services/invite-api.service';
import { InvitationsResponse } from '../models/InviteResponse';
import { EventApiService } from '../../eveniment/services/event-api.service';
import { EventResponse } from '../../eveniment/models/EventResponse';
import { InviteCardComponent } from '../components/invite-card/invite-card.component';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StatusIconComponent } from '../../common/components/status-icon/status-icon.component';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invitations',
  standalone: true,
  imports: [InviteCardComponent, FontAwesomeModule, StatusIconComponent, CommonModule],
  templateUrl: './invitations.component.html',
  styleUrl: './invitations.component.css'
})
export class InvitationsComponent implements OnInit {
  invitations$: Observable<InvitationsResponse[]> = of([]);
  eventDetails$: Observable<EventResponse> = of();
  inviteDetails: InvitationsResponse | null = null;
  barsIcon = faBarsStaggered

  constructor(private inviteApiService: InviteApiService, private eventApiService: EventApiService) {  }

  ngOnInit(): void {
    this.invitations$ = this.inviteApiService.getAll();
  }

  handleInviteDetails(invite: InvitationsResponse) {
    this.inviteDetails = invite;
    this.eventDetails$ = this.eventApiService.get(invite.eventId);
  }
}
