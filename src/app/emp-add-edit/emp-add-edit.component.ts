
// Component → it turns TypeScript classes into reusable UI elements.
// ChangeDetectionStrategy → This optimizes how Angular detects and updates changes in your UI.
import { Component, ChangeDetectionStrategy, } from '@angular/core';

// It provides ready-made, customizable buttons that follow Material Design guidelines.
import { MatButtonModule } from '@angular/material/button';

// It lets you create modal dialogs — pop-up windows that appear on top of your app's content. These are great for showing forms, alerts, confirmations, or additional details without navigating to a new page.
import { MatDialogModule } from '@angular/material/dialog';

// It gives you a structured container for form controls (like inputs, selects, or date pickers) and automatically handles features like floating labels, error messages, and appearance styles.
import { MatFormFieldModule } from '@angular/material/form-field';


// IMPORTS related to DATE
// MatNativeDateModule:- Allows the datepicker to work out of the box without needing a custom date adapter.
// provideNativeDateAdapter:- Ensures that the date picker can parse and format dates properly.
// MAT_DATE_FORMATS:- It controls how dates look when users type them in or see them in the input field.
//  MAT_DATE_LOCALE:- It is a provider that sets the locale (regional settings) for the datepicker and controls how dates are displayed and parsed — including the date format, names of months, and the first day of the week.
import { MatNativeDateModule, provideNativeDateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// It gives you a date picker UI element that pops up a calendar for selecting dates. You can use it with an input field to capture dates in a user-friendly way.
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatInputModule } from '@angular/material/input'; //  provides the input field component,
import { MatRadioModule } from '@angular/material/radio'; // helps to create Redio Button
import { MatSelectModule } from '@angular/material/select'; // helps to create dropdown list

// Using "FormBuilder" makes the code shorter and cleaner. Instead of manually creating FormGroup and FormControl, you build forms in a single step.
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';



export const MY_DATE_FORMATS = {
  parse: { // parse → How the date is interpreted when typed manually
    dateInput: 'DD/MM/YYYY',  // Format for parsing input
  },
  display: { // display → How the date appears in the UI
    dateInput: 'DD/MM/YYYY',  // Format for displaying in the input field
    monthYearLabel: 'MMM YYYY', // Format for month and year label
    dateA11yLabel: 'LL', // Accessible label format
    monthYearA11yLabel: 'MMMM YYYY', // Accessible month/year label
  }
};

@Component({ // The @Component decorator is a core part of Angular — it tells Angular that the class is a component and gives it metadata to define how the component works!

  // selector → HTML tag name to use the component
  selector: 'app-emp-add-edit',

  // Provides the default native date adapter. Without this, the datepicker won’t open or function properly.
  providers: [provideNativeDateAdapter(), // Shows Calender on clicking the icon in interface

  { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, // Sets a custom date format. overrides the default MM/DD/YYYY format this way.
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } // Sets the date locale to British English as 'en-GB' uses DD/MM/YYYY

    //   🟡 How it works together:
    //      When you click the datepicker icon:

    //  1.    The calendar appears thanks to provideNativeDateAdapter().
    //  2.    When you select a date, it shows as DD/MM/YYYY because of MAT_DATE_FORMATS.
    //  3.    Locale settings ensure date labels and parsing also follow day-first ordering (en-GB).

  ],
  // This imports array tells Angular which Material components and form modules your component needs.
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, FormsModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatRadioModule, MatSelectModule, ReactiveFormsModule],

  // OnPush in "ChangeDetectionStrategy" makes Angular check for changes only when inputs change or when events (like clicks) happen.
  // Also, It skips unnecessary checks to boost performance — great for large or complex apps!
  changeDetection: ChangeDetectionStrategy.OnPush,


  // templateUrl → Path to the component's HTML file
  templateUrl: './emp-add-edit.component.html',

  // styleUrls → Path to the component’s CSS/SCSS files
  styleUrl: './emp-add-edit.component.scss'
})



export class EmpAddEditComponent {

  education: string[] = ["Matric", "Diploma", "Intermediate", "Graduate", "Post Graduate"];

  empForm: FormGroup; //  it is like an object that holds your form fields as key-value pairs.

  constructor(private _fb: FormBuilder, private _empService: EmployeeService, private _dialogRef: DialogRef<EmpAddEditComponent>) { // building a form using FormBuilder, where _fb is the name of the form and private tag means that we are ristricting the use of this form only to the current component

    // Here, this.empForm means "FormGroup"(empForm as we initiated above) in "EmpAddEditComponent"(this)
    // this.empForm is a FormGroup, which is a collection of form controls. It acts as a JavaScript object that holds your form’s state, values, and validation info.
    this.empForm = this._fb.group({  //  this._fb.group() creates a FormGroup instance— a collection of form controls.
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  onFormSubmit() {
    if (this.empForm.valid) { // response on validation  (valid = true)
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added Successfully!')
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err)
        }
      });
      console.log(this.empForm.value);
    }
  }
}
