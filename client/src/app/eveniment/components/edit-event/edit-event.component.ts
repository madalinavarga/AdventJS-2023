import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventResponse } from '../../models/EventResponse';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventApiService } from '../../services/event-api.service';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit {
  editEventForm!: FormGroup
  closeIcon = faClose;
  @Output() handleCloseModal = new EventEmitter<any>();
  @Input() event: EventResponse | null = null;
  @Output() editedEvent = new EventEmitter<EventResponse>();

  constructor(private _fb: FormBuilder, private eventApiService: EventApiService) { }

  ngOnInit(): void {
    this.editEventForm = new FormGroup({
      name: new FormControl(this.event?.name, Validators.required),
      date: new FormControl(this.event?.date, Validators.required),
      sendReminder: new FormControl(this.event?.sendReminder)
    });
  }

  closeModal() {
    this.handleCloseModal.emit();
  }

  onSubmit() {
    if (this.editEventForm.valid) {
      this.eventApiService.update(this.editEventForm.value, this.event?.id!).subscribe({
        next: data => {
          this.handleCloseModal.emit();
          this.editedEvent.emit(data as EventResponse);
        }
      })
    } else {
      console.error("Invalid form")
    }
  }

  get f() {
    return this.editEventForm?.controls;
  }
}
