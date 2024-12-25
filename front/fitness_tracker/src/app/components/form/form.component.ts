import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table'; // Таблицы Material
import { MatFormFieldModule } from '@angular/material/form-field'; // Поля ввода
import { MatInputModule } from '@angular/material/input'; // Инпуты
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  imports:[
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class FormComponent {
  loginForm: any

  onSubmit(){}
}
