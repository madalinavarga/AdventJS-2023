import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventResponse } from '../models/EventRequest';
import { EventApiService } from '../services/event-api.service';
import { DateCountdownPipe } from '../utils/date-countdown-pipe.pipe';
import { UpperCasePipe } from '@angular/common';
import { InviteApiService } from '../services/invite-api.service';
import { InviteEventRequest } from '../models/InviteEventRequest';
import { CardComponent } from '../components/card/card.component';
import { EventUsersResponse } from '../models/EventUsersResponse';

@Component({
  selector: 'app-invite',
  standalone: true,
  imports: [ReactiveFormsModule, DateCountdownPipe, UpperCasePipe, CardComponent],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.css'
})
export class InviteComponent implements OnInit {
  inviteForm!: FormGroup;
  eventId: string = '';
  eveniment!: EventResponse;
  invitedUsers: EventUsersResponse[] = [];


  constructor(private _formBuilder: FormBuilder, private _activeRoute: ActivatedRoute, private _eventService: EventApiService, private _inviteService: InviteApiService) {

  }

  ngOnInit(): void {
    this.inviteForm = this._formBuilder.group({
      name: ['Name', [Validators.required]],
      email: ['Email', [Validators.required, Validators.email]],
    });

    this._activeRoute.params.subscribe(params => {
      this.eventId = params['id'];
    })

    this._eventService.get(this.eventId).subscribe({
      next: data => {
        this.eveniment = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })

    this._eventService.getUsersFromAnEvent(this.eventId).subscribe({
      next: users => {
        this.invitedUsers = users;
      },
      error: error => {
        console.error('There was an error!', error);
      }

    })
  }

  onSubmit() {
    console.log("CLick")
    if (this.inviteForm.valid) {
      let inviteRequest: InviteEventRequest = {
        "name": this.inviteForm.value["name"],
        "email": this.inviteForm.value["email"],
        "eventId": this.eventId
      };

      this._inviteService.createInvite(inviteRequest).subscribe({
        next: (data) => {
        },
        error: (err) => { }
      })
    }
  }

  get f() {
    return this.inviteForm.controls;
  }

}
