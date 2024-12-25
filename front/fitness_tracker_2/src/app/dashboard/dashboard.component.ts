import { Component } from '@angular/core';
import { WorkoutComponent } from '../workout/workout.component';
import { ExerciseComponent } from '../exercise/exercise.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    WorkoutComponent,
    ExerciseComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
