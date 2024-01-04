import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { EventUsersResponse } from '../../models/EventUsersResponse';
import { ConvertStatusPipe } from '../../../common/utils/convert-status.pipe';
import { GetSubstringPipe } from '../../../common/utils/get-substring.pipe';
import { UpperCasePipe } from '@angular/common';
import { StatusIconComponent } from '../../../common/components/status-icon/status-icon.component';
import { InviteApiService } from '../../services/invite-api.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ConvertStatusPipe, GetSubstringPipe, UpperCasePipe, StatusIconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnDestroy {
  @Input()
  public user: EventUsersResponse | null = null;
  @Input() eventId: string = "";

  @Output() refetch = new EventEmitter<void>();

  unsubscribeApi = new Subscription();

  constructor(private inviteApiService: InviteApiService) {
  }

  ngOnDestroy(): void {
    this.unsubscribeApi.unsubscribe();
  }

  removeInvitation() {
    this.unsubscribeApi = this.inviteApiService.removeInvite(this.eventId, this.user?.id!).subscribe({
      next: () => {
        this.refetch.emit();
      }
    })
  }

}
