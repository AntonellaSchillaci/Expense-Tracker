import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { ExpenseEditModalComponent } from "../expense-edit-modal/expense-edit-modal.component";

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, ExpenseEditModalComponent],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  totalAmount: number = 0;
  selectedExpense: Expense | null = null;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.totalAmount = parseFloat(this.expenseService.getTotalAmount().toFixed(2));

    });
  }

  getIconClass(category: string): string {
    switch (category.toLowerCase()) {
      case 'cibo': return 'fas fa-utensils';
      case 'trasporti': return 'fas fa-bus';
      case 'bollette': return 'fas fa-file-invoice-dollar';
      case 'tempo libero': return 'fas fa-gamepad';
      case 'salute': return 'fas fa-heartbeat';
      case 'vestiti': return 'fas fa-tshirt';
      case 'viaggi': return 'fas fa-plane';
      case 'bellezza': return 'fas fa-spa';
      case 'casa': return 'fas fa-home';
      default: return 'fas fa-receipt';
    }
  }

  deleteExpense(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa spesa?')) {
      this.expenseService.removeExpense(id);
    }
  }

  editExpense(expense: Expense): void {
    this.selectedExpense = { ...expense };
  }

  onExpenseSaved(updated: Expense): void {
    this.expenseService.updateExpense(updated);
    this.selectedExpense = null;
  }

  onExpenseEditCancelled(): void {
    this.selectedExpense = null;
  }
}
