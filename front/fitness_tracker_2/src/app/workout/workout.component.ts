import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { WorkoutService, Workout } from '../workout.service';
import { FormsModule } from '@angular/forms'; // Импортируйте FormsModule
import { Exercises, ExerciseService } from '../exercise.service';
@Component({
  selector: 'app-workout',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {
  // workouts = [
  //   { id: 1, name: 'Full Body Workout',exercises: [1,2,3], duration: '45 mins', calories: 400, date:'' },
  //   { id: 2, name: 'Cardio Blast',exercises: [1,2,3], duration: '30 mins', calories: 300, date:'' },
  //   { id: 3, name: 'Strength Training',exercises: [1,2,3], duration: '60 mins', calories: 500, date:'' },
  // ];
  workouts: Array<Workout> = []
  exercises: any[] = []; // Массив упражнений
  selectedExercises: number[] = []; // ID выбранных упражнений
  constructor(private workoutService: WorkoutService, private exerciseService: ExerciseService) {}
  newWorkout: Workout = { id: 0, date: new Date(), exercises: [] }; // Пустой воркаут
  exercisesIdInput: string = '';
  errorMessage: string = '';
  ngOnInit() {

    this.getExercises();
    // this.fetchWorkouts();
  }
  getExercises(): void {
    this.exerciseService.getExercises().subscribe((data: any) => {
      this.exercises = data;
    });
  }
  showForm: boolean = false; // Управление видимостью формы
  toggleForm(): void {
    this.showForm = !this.showForm; // Переключение видимости
  }


  fetchWorkouts() {
    this.workoutService.getWorkouts().subscribe(
      (data) => (this.workouts = data),
      (error) => console.error('Error fetching workouts:', error)
    );
  }
  addWorkout(): void {
    const exerciseIds = this.selectedExercises

    let workoutToSend = new Workout(0, new Date(), exerciseIds)
    this.workoutService.createWorkout(workoutToSend).subscribe((response) => {
      this.errorMessage = "";
      this.workouts.push(workoutToSend); // Добавляем новый воркаут в массив
      this.newWorkout = { id: 0, date: new Date, exercises: [] }; // Сброс формы
    },
    (error)=>{
      if (error.status == 400){
        this.errorMessage = error.error.message;
      }
    });
    
    this.showForm = false; // Скрыть форму после добавления
  }
  

  deleteWorkout(id: number) {
    this.workoutService.deleteWorkout(id).subscribe(() => {
      this.workouts = this.workouts.filter((workout) => workout.id !== id);
    });
  }
}


