import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';

export class Exercises{
    id: number
    name: string
    type: string
    calories: number
    repetitions: number
    duration: number

    constructor(id: number, name: string, type: string, calories: number, repetitions: number, duration: number) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.calories = calories;
        this.repetitions = repetitions;
        this.duration = duration;
    };
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private apiUrl = 'https://localhost:7032/api/exercises'; // URL для работы с упражнениями

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  // Получение всех упражнений
  getExercises(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Получение упражнения по ID
  getExerciseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Создание нового упражнения
  createExercise(exercise: Exercises): Observable<Exercises> {
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
    return this.http.post<Exercises>(`${this.apiUrl}`, exercise, {headers: _headers}).pipe(
            catchError((error) => {
                console.log(error)
                throw error; // Выброс ошибки для обработки в компоненте
              })
        );
  }

  // Обновление упражнения
  updateExercise(id: number, exercise: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, exercise);
  }

  // Удаление упражнения
  deleteExercise(id: number): Observable<any> {
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
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {headers: _headers}).pipe(
        catchError((error) => {
            console.log(error)
            throw error; // Выброс ошибки для обработки в компоненте
          })
    );
  }
}
