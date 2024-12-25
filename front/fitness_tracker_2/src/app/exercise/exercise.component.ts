import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Exercises, ExerciseService } from '../exercise.service';
import { FormsModule } from '@angular/forms'; // Импортируйте FormsModule


@Component({
  selector: 'app-exercise',
  imports: [NgForOf, NgIf, FormsModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {
  // exercises = [
  //   // { id: 1, name: 'Push-up', reps: 15, sets: 3 },
  //   // { id: 2, name: 'Squat', reps: 12, sets: 4 },
  //   // { id: 3, name: 'Pull-up', reps: 10, sets: 3 },
  //   // { id: 4, name: 'Plank', reps: '60 secs', sets: 3 },
  // ];
  exercises: Array<Exercises> = []
  newExercise: Exercises = { id: 0, name: '', type: '', calories:0, repetitions: 0, duration: 0 }; // Пустое упражнение
  sortDirection: 'asc' | 'desc' = 'asc';
  errorMessage: string = '';
  showForm: boolean = false; // Управление видимостью формы
  toggleForm(): void {
    this.showForm = !this.showForm; // Переключение видимости
  }
  exerciseTypes: string[] = ['Cardio', 'Strength', 'Flexibility', 'Balance'];


  sortExercises() {
    const direction = this.sortDirection === 'asc' ? 1 : -1;
    this.exercises.sort((a, b) =>
      a.name.localeCompare(b.name) * direction
    );
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit() {
    // this.fetchExercises();
  }

  fetchExercises() {
    this.exerciseService.getExercises().subscribe(
      (data) => (this.exercises = data),
      (error) => console.error('Error fetching exercises:', error)
    );
  }
  addExercise(): void {
    this.exerciseService.createExercise(this.newExercise).subscribe((response) => {
      console.log(response);
      this.exercises.push(response); // Добавляем новое упражнение в массив
      this.newExercise = { id: 0, name: '', type: '', calories: 0, repetitions: 0, duration:0 }; // Сброс формы
    },
    (error)=>{
        if (error.status == 400){
          this.errorMessage = error.error.message;
        }
      });
      
      this.showForm = false; // Скрыть форму после добавления
    };

  deleteExercise(id: number) {
    this.exerciseService.deleteExercise(id).subscribe(() => {
      this.exercises = this.exercises.filter((exercise) => exercise.id !== id);
    });
  }
}


