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
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
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
export class ExerciseFormComponent implements OnInit {
  exerciseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExerciseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.exerciseForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      type: [this.data?.type || '', Validators.required],
      repetitions: [this.data?.repetitions || '', [Validators.required, Validators.min(1)]],
      duration: [this.data?.duration || '', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
      this.dialogRef.close(this.exerciseForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
