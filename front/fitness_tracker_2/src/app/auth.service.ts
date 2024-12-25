import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7032/api/auth/login'; // URL для логина
  private userSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(username: string, password: string) {
    console.log(username, password)
    return this.http.post<{ token: string; username: string }>(this.apiUrl, { username, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token); // Сохранить JWT
        this.userSubject.next(response.username); // Сохранить имя пользователя
      }),
      catchError((error) => {
        console.log(error)
        throw error; // Выброс ошибки для обработки в компоненте
      })
    );
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }


  isAuthenticated(): boolean {
    let token: string | null
    if (isPlatformBrowser(this.platformId)) {
        return !!localStorage.getItem('token');
    } else {
        return false
    }
  }
}
