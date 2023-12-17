import { Component, Input } from '@angular/core';
import { EventUsersResponse } from '../../models/EventUsersResponse';
import { ConvertStatusPipe } from '../../utils/convert-status.pipe';
import { GetSubstringPipe } from '../../utils/get-substring.pipe';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ConvertStatusPipe, GetSubstringPipe, UpperCasePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input()
  public user: EventUsersResponse | null = null;

  constructor(){

  }

}