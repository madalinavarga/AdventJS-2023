import { Component, OnInit } from '@angular/core';
import { InviteApiService } from '../services/invite-api.service';
import { InvitationsResponse } from '../models/InviteResponse';

@Component({
  selector: 'app-invitations',
  standalone: true,
  imports: [],
  templateUrl: './invitations.component.html',
  styleUrl: './invitations.component.css'
})
export class InvitationsComponent implements OnInit {
  invitations: InvitationsResponse[] = [];
  constructor(private inviteApiService: InviteApiService) {

  }
  ngOnInit(): void {
    this.inviteApiService.getAll().subscribe({
      next: (data) => {
        console.log("invitations: ", data);
        this.invitations = data;
      },
      error: err => {
        console.error(err)
      }
    })
  }
}
