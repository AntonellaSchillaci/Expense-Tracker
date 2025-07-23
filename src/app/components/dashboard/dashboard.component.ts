import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { ExpenseTotalComponent } from '../expense-total/expense-total.component';
import { Location } from '@angular/common';
import { ExpenseChartsComponent } from '../expense-charts/expense-charts.component';
import { ExpenseCategorySummaryComponent } from '../expense-category-summary/expense-category-summary.component';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { UserBadgeComponent } from '../user-badge/user-badge.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ExpenseTotalComponent,
    ExpenseChartsComponent,
    ExpenseCategorySummaryComponent,
    UserBadgeComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  expenses = signal<Expense[]>([]);

  constructor(
    private location: Location,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses.set(data);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
