import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventApiService } from '../services/event-api.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit {
  newGroupForm!: FormGroup

  constructor(private _formBuilder: FormBuilder, private _eventApiService: EventApiService) { }

  ngOnInit(): void {
    this.newGroupForm = this._formBuilder.group({
      name: ['Group name', Validators.required],
      date: ['Date', Validators.required],
      sendReminder: ['', Validators.required],
    })
  }

  get f() {
    return this.newGroupForm.controls;
  }

  onSubmit() {
    console.log(this.newGroupForm.value);
    this._eventApiService.create(this.newGroupForm.value).subscribe({
      next: data => {
        console.log("OK", data);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
}
