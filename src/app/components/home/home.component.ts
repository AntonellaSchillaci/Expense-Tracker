import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ExpenseFormComponent } from "../expense-form/expense-form.component";
import { ExpenseListComponent } from "../expense-list/expense-list.component";

@Component({
  selector: 'app-home',
  imports: [ExpenseFormComponent, ExpenseListComponent],
  templateUrl: './home.components.html',
})
export class HomeComponent {
  title = 'expense-tracker';
}
