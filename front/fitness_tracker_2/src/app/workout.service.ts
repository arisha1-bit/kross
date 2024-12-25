import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export class Workout{
    id: number
    date: Date
    exercises: Array<number>

    constructor(id: number, date: Date, exercises: Array<number>) {
        this.id = id;
        this.date = date;
        this.exercises = exercises;
    };
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private apiUrl = 'https://localhost:7032/api/Workouts'; // URL для работы с воркаутами
  
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }
    
  // Получение всех воркаутов
  getWorkouts(): Observable<Workout[]> {
    let token: string | null
    if (isPlatformBrowser(this.platformId)) {
        token = localStorage.getItem('token');
    } else {
        token = ''
    }
    const _headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    
    return this.http.get<Workout[]>(this.apiUrl, {headers:_headers}); 
  }

  // Получение воркаута по ID
  getWorkoutById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Создание нового воркаута
  createWorkout(workout: Workout): Observable<Workout> {
    let token: string | null
    if (isPlatformBrowser(this.platformId)) {
        token = localStorage.getItem('token');
    } else {
        token = ''
    }
    const _headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    return this.http.post<Workout>(`${this.apiUrl}`, workout, {headers: _headers}).pipe(
        catchError((error) => {
            console.log(error)
            throw error; // Выброс ошибки для обработки в компоненте
          })
    );
  }

  // Обновление воркаута
  updateWorkout(id: number, workout: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, workout);
  }

  // Удаление воркаута
  deleteWorkout(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
