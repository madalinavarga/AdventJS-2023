import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventResponse } from '../models/EventRequest';
import { EventApiService } from '../services/event-api.service';
import { DateCountdownPipe } from '../utils/date-countdown-pipe.pipe';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-invite',
  standalone: true,
  imports: [ReactiveFormsModule, DateCountdownPipe, UpperCasePipe],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.css'
})
export class InviteComponent implements OnInit {
  inviteForm!: FormGroup;
  eventId: string = '';
  eveniment!: EventResponse;
  constructor(private _formBuilder: FormBuilder, private _activeRoute: ActivatedRoute, private _eventService: EventApiService) {

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
  }

  handleOnSubmit() {
    console.log(this.inviteForm.value);
  }

  get f() {
    return this.inviteForm.controls;
  }

}
