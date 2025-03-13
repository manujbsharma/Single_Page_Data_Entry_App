import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet, 
    MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Single_Page_Data_Entry_App';

  constructor(private _dialog: MatDialog){

  }

  openAddEditEmpForm(){
    this._dialog.open(EmpAddEditComponent)
  }
}
