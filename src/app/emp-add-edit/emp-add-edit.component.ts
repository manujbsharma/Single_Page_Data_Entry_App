import { Component, ChangeDetectionStrategy, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-emp-add-edit',
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, FormsModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent {

  eductation: string[] = [
      "Matric", "Diploma", "Intermediate", "Graduate", "Post Graduate"
  ];

}
