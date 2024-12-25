import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MenuComponent } from "./menu/menu.component";
import { AuthComponent } from "./auth/auth.component";
import { BrowserModule } from "@angular/platform-browser";
// import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; //
import { WorkoutComponent } from './workout/workout.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { AppRoutingModule } from "./app.routes";


 @NgModule({ 
    declarations: [
        // AppComponent,
        // HeaderComponent,
        // FooterComponent,
        // MenuComponent,
        // AuthComponent,
        // WorkoutComponent,
        // ExerciseComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        // HttpClient,
        CommonModule
    ],
    providers: [
    ]

 })
 export class AppModule {
    
 }