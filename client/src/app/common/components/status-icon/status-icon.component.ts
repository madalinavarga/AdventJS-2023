import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleQuestion, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-status-icon',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './status-icon.component.html',
  styleUrl: './status-icon.component.css'
})
export class StatusIconComponent implements OnInit {
  checkIcon = faCircleCheck;
  questionIcon = faCircleQuestion;
  xIcon = faCircleXmark;
  iconStyle = '';

  @Input()
  inviteStatus: number | undefined = 0;

  @Input() set extraStyle(newStyle: string) {
    this.iconStyle += ' ' + newStyle;
  }

  constructor() { }

  ngOnInit(): void {
    this.getStyle(this.inviteStatus ?? 0);
  }

  getIconName(inviteStatus: number) {
    switch (inviteStatus) {
      case 0:
        return this.questionIcon;
      case 1:
        return this.xIcon;
      case 2:
        return this.checkIcon;
      default:
        return this.questionIcon;
    }
  }

  getStyle(inviteStatus: number) {
    switch (inviteStatus) {
      case 1:
        this.iconStyle += ' text-red-500 p-4 text-xl'
        break;
      case 2:
        this.iconStyle += ' text-green-500 p-4 text-xl'
        break;
      default:
        this.iconStyle += ' text-gray-500 p-4 text-xl'
    }
  }
}
