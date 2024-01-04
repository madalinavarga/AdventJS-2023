import { Component, Input } from '@angular/core';
import { EventUsersResponse } from '../../models/EventUsersResponse';
import { ConvertStatusPipe } from '../../../common/utils/convert-status.pipe';
import { GetSubstringPipe } from '../../../common/utils/get-substring.pipe';
import { UpperCasePipe } from '@angular/common';
import { StatusIconComponent } from '../../../common/components/status-icon/status-icon.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ConvertStatusPipe, GetSubstringPipe, UpperCasePipe, StatusIconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()
  public user: EventUsersResponse | null = null;

  constructor() {

  }

}
