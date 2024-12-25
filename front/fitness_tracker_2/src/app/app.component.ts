import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MenuComponent } from "./menu/menu.component";
import { AuthComponent } from "./auth/auth.component";
import { WorkoutComponent } from './workout/workout.component';
import { ExerciseComponent } from './exercise/exercise.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    // HeaderComponent,
    // FooterComponent,
    // MenuComponent,
    // AuthComponent,
    // WorkoutComponent,
    // ExerciseComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fitness_tracker_2';
}
