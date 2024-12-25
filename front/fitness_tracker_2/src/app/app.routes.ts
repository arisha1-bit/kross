
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions, InMemoryScrollingOptions } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutComponent } from './workout/workout.component';
import { ExerciseComponent } from './exercise/exercise.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Перенаправление на логин
    { path: 'login', component: AuthComponent },
    // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'workouts', component: WorkoutComponent },
    { path: 'exercises', component: ExerciseComponent },
    {
      path: 'dashboard',
      canActivate: [AuthGuard], // Защищенный маршрут\
      component: DashboardComponent
      // children: [
      //   { path: 'workouts', component: WorkoutComponent },
      //   { path: 'exercises', component: ExerciseComponent },
      // ],
      
    },
   
  ];
  const routerOptions: InMemoryScrollingOptions = {
    scrollPositionRestoration: 'disabled', // Включение восстановления позиции скролла
    anchorScrolling: 'disabled'           // Включение прокрутки к якорям
  };
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
