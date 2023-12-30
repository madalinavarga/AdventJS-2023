import { Component, Input } from '@angular/core';
import { EventUsersResponse } from '../../models/EventUsersResponse';
import { ConvertStatusPipe } from '../../../common/utils/convert-status.pipe';
import { GetSubstringPipe } from '../../../common/utils/get-substring.pipe';
import { UpperCasePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleXmark, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ConvertStatusPipe, GetSubstringPipe, UpperCasePipe, FontAwesomeModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  faCircleCheck = faCircleCheck
  faCircleXmark = faCircleXmark
  faCircleQuestion = faCircleQuestion
  @Input()
  public user: EventUsersResponse | null = null;

  constructor() {

  }

}
