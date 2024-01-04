import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventResponse } from '../models/EventRequest';
import { EventApiService } from '../services/event-api.service';
import { DateCountdownPipe } from '../../common/utils/date-countdown-pipe.pipe';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { InviteApiService } from '../services/invite-api.service';
import { InviteEventRequest } from '../models/InviteEventRequest';
import { CardComponent } from '../components/card/card.component';
import { EventUsersResponse } from '../models/EventUsersResponse';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-invite',
  standalone: true,
  imports: [ReactiveFormsModule, DateCountdownPipe, UpperCasePipe, CardComponent, CommonModule],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.css'
})
export class InviteComponent implements OnInit {
  inviteForm!: FormGroup;
  eventId: string = '';
  eveniment$: Observable<EventResponse> = of();
  invitedUsers$: Observable<EventUsersResponse[]> = of([]);


  constructor(private _formBuilder: FormBuilder, private _activeRoute: ActivatedRoute, private eventService: EventApiService, private _inviteService: InviteApiService) {

  }

  ngOnInit(): void {
    this.inviteForm = this._formBuilder.group({
      name: ['Name', [Validators.required]],
      email: ['Email', [Validators.required, Validators.email]],
    });

    this._activeRoute.params.subscribe(params => {
      this.eventId = params['id'];
    })

    this.eveniment$ = this.eventService.get(this.eventId);

    this.invitedUsers$ = this.eventService.getUsersFromAnEvent(this.eventId);
  }

  onSubmit() {
    if (this.inviteForm.valid) {
      let inviteRequest: InviteEventRequest = {
        "name": this.inviteForm.value["name"],
        "email": this.inviteForm.value["email"],
        "eventId": this.eventId
      };

      this._inviteService.createInvite(inviteRequest).subscribe({
        next: (data) => {
          this.invitedUsers$ = this.eventService.getUsersFromAnEvent(this.eventId);
        },
        error: (err) => { }
      })
    }
  }

  get f() {
    return this.inviteForm.controls;
  }

}
