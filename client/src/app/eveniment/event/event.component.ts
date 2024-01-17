import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventApiService } from '../services/event-api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit, OnDestroy {
  //services
  formBuilder = inject(FormBuilder);
  eventApiService = inject(EventApiService);
  router = inject(Router);

  newGroupForm!: FormGroup
  unsubscribe :Subscription =new Subscription();
  
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.newGroupForm = this.formBuilder.group({
      name: ['Group name', Validators.required],
      date: ['Date', Validators.required],
      sendReminder: ['', Validators.required],
    })
  }

  get f() {
    return this.newGroupForm.controls;
  }

  onSubmit() {
    this.unsubscribe = this.eventApiService.create(this.newGroupForm.value).subscribe({
      next: data => {
        if (data) {
          this.router.navigate([`/event/${data.id}/invite`])
        } else {
          console.log("Not id");
        }
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
}
