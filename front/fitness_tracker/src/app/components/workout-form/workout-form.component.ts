import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'; // Таблицы Material
import { MatFormFieldModule } from '@angular/material/form-field'; // Поля ввода
import { MatInputModule } from '@angular/material/input'; // Инпуты
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WorkoutFormComponent implements OnInit {
  workoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WorkoutFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.workoutForm = this.fb.group({
      date: [this.data?.date || '', Validators.required],
      duration: [this.data?.duration || '', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.workoutForm.valid) {
      this.dialogRef.close(this.workoutForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
