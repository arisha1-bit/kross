import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:7032/api/';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  // Workout API
  getWorkouts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/workouts`);
  }

  addWorkout(workout: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/workouts`, workout);
  }

  updateWorkout(id: number, workout: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/workouts/${id}`, workout);
  }

  deleteWorkout(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/workouts/${id}`);
  }

  // Exercise API
  getExercises(): Observable<any> {
    return this.http.get(`${this.baseUrl}/exercises`);
  }

  addExercise(exercise: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/exercises`, exercise);
  }

  updateExercise(id: number, exercise: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/exercises/${id}`, exercise);
  }

  deleteExercise(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/exercises/${id}`);
  }
}
