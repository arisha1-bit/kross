import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'; // Таблицы Material
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    MatFormFieldModule,
    MatTableModule,
  ],
})
export class DashboardComponent implements OnInit {
  workouts: any[] = [];
  exercises: any[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadWorkouts();
    this.loadExercises();
  }

  // Workouts
  loadWorkouts() {
    this.apiService.getWorkouts().subscribe((data) => {
      this.workouts = data;
    });
  }

  openWorkoutForm(workout: any = null) {
    const dialogRef = this.dialog.open(WorkoutFormComponent, { data: workout });
    dialogRef.afterClosed().subscribe(() => this.loadWorkouts());
  }

  deleteWorkout(id: number) {
    this.apiService.deleteWorkout(id).subscribe(() => this.loadWorkouts());
  }

  // Exercises
  loadExercises() {
    this.apiService.getExercises().subscribe((data) => {
      this.exercises = data;
    });
  }

  openExerciseForm(exercise: any = null) {
    const dialogRef = this.dialog.open(ExerciseFormComponent, { data: exercise });
    dialogRef.afterClosed().subscribe(() => this.loadExercises());
  }

  deleteExercise(id: number) {
    this.apiService.deleteExercise(id).subscribe(() => this.loadExercises());
  }

  editWorkout(workout: any): void {
    console.log(workout);
  }
  
  editExercise(exercise: any): void {
    console.log(exercise);
  }
  
}


