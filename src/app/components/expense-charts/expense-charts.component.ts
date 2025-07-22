import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-charts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-charts.component.html',
  styleUrls: ['./expense-charts.component.scss'],
})
export class ExpenseChartsComponent implements OnInit {
  expenses = signal<Expense[]>([]);
  budget = signal(1000);
  remainingBudget = signal(1000);
  newBudgetAmount = 0;
  showConfirmation = false;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe((expenses) => {
      this.expenses.set(expenses);
      this.updateRemainingBudget(expenses);
    });

    this.expenseService.getBudget().subscribe((savedBudget) => {
      if (savedBudget !== null && savedBudget !== undefined) {
        this.budget.set(savedBudget);
        this.updateRemainingBudget(this.expenses());
      }
    });
  }

  private updateRemainingBudget(expenses: Expense[]): void {
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    this.remainingBudget.set(this.budget() - totalSpent);
  }

  addBudget(): void {
    const amount = Number(this.newBudgetAmount);
    if (!isNaN(amount) && amount !== 0) {
      const newBudget = this.budget() + amount;
      this.expenseService.setBudget(newBudget);
      this.newBudgetAmount = 0;
    }
  }

  getTotalExpenses(): number {
    return this.expenses().reduce((sum, e) => sum + e.amount, 0);
  }
}
