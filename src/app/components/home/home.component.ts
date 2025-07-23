import { Component } from "@angular/core";
import { ExpenseFormComponent } from "../expense-form/expense-form.component";
import { ExpenseListComponent } from "../expense-list/expense-list.component";
import { UserBadgeComponent } from "../user-badge/user-badge.component";


@Component({
  selector: 'app-home',
  imports: [
    ExpenseFormComponent,
    ExpenseListComponent,
    UserBadgeComponent,
  ],
  templateUrl: './home.components.html',
})
export class HomeComponent {
  title = 'expense-tracker';
}

