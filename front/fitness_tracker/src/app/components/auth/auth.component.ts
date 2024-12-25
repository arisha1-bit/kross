import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table'; // Таблицы Material
import { MatFormFieldModule } from '@angular/material/form-field'; // Поля ввода
import { MatInputModule } from '@angular/material/input'; // Инпуты
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '../../services/api.service';

@NgModule({
  declarations: [ 
    ApiService
  ]
})

@Component({
  selector: 'app-auth',
    imports: [
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      FormsModule,
      ReactiveFormsModule,
      ApiService
    ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Отправь данные на сервер
      // При успешном входе перенаправь на dashboard
      this.apiService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Успешный вход:', response);
          // При успешном входе перенаправь на dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Ошибка входа:', error);
          // Обработайте ошибку
        }
      });
      this.router.navigate(['/dashboard']);
    }
  }
}

