import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Импортируем созданный сервис
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  username = '';
  password = '';
  errorMessage: string | null = null;
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']); // Переход на защищенный маршрут после успешной авторизации
        this.successMessage = 'Авторизация успешна!';
        this.errorMessage = '';
      },
      error: (err: any) => {
        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Неверный логин или пароль.';
          this.successMessage = '';

        } else {
          this.errorMessage = 'Произошла ошибка при попытке входа.';
          this.successMessage = '';
        }
      }
  });
  }
}

