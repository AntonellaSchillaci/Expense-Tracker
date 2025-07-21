import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExpenseFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expense-tracker';
}

