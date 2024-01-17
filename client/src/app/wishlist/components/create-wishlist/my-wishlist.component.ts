import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputWishComponent } from '../input-wish/input-wish.component';
import { WishCreate } from '../../models/Wish';
import { WishApiService } from '../../services/wish-api.service';

@Component({
  selector: 'app-create-wishlist',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputWishComponent],
  templateUrl: './my-wishlist.component.html'
})
export class MyWishlistComponent implements OnInit {
  maxCount = 5;
  wishlistForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  wishApiService = inject(WishApiService);

  wishList: WishCreate[] = []

  ngOnInit(): void {
    this.wishlistForm = this.formBuilder.group({
      items: this.formBuilder.array([]),
      addForm: this.formBuilder.group({
        itemName: ['iPhone 15', Validators.required],
        itemURL: ['http://apple.com', Validators.required]
      })
    });

    this.wishApiService.get().subscribe({
      next: (data) => {
        console.log("Data: ", data)
      }
    })
  }

  get items(): FormArray {
    return this.wishlistForm.get('items') as FormArray;
  }

  get addForm() {
    return this.wishlistForm.get('addForm') as FormGroup;
  }

  addItem() {
    if (this.items.length < this.maxCount) {
      const addFormValue = this.addForm.value;
      this.items.push(this.formBuilder.group({
        name: [addFormValue.itemName, Validators.required],
        url: [addFormValue.itemURL, Validators.required]
      }));
      // Resetează valorile formularului de adăugare la valorile implicite
      this.addForm.reset({
        itemName: 'iPhone 15',
        itemURL: 'http://apple.com'
      });
    }
  }


  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    this.wishList = this.items.value;
    this.wishApiService.create(this.wishList).subscribe({
      next: () => console.log(`Wish list created!`),
    })
  }
}
