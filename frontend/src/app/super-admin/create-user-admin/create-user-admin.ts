import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-user-admin',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-user-admin.html',
  styleUrl: './create-user-admin.css',
})
export class CreateUserAdmin {
  onSubmit(form: any) {
    console.log('Form submitted:', form.value);
  }
}
