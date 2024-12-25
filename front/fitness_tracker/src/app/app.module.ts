import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Анимации Material
import { FormsModule } from '@angular/forms'; // Для форм
import { MatTableModule } from '@angular/material/table'; // Таблицы Material
import { MatFormFieldModule } from '@angular/material/form-field'; // Поля ввода
import { MatInputModule } from '@angular/material/input'; // Инпуты
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Компоненты
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [ // Все компоненты
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [ // Модули, которые мы подключаем
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent] // Главный компонент для запуска
})
export class AppModule { }
