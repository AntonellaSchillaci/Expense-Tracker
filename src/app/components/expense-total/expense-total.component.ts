import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-total.component.html',
  styleUrls: ['./expense-total.component.scss'],
})
export class ExpenseTotalComponent implements OnInit {
  totalAmount: number = 0;
  currentMonthTotal: number = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe(() => {
      this.updateTotals();
    });
  }

  updateTotals(): void {
    this.totalAmount = this.expenseService.getTotalAmount();

    const now = new Date();
    this.currentMonthTotal = this.expenseService.getTotalAmountForMonth(
      now.getFullYear(),
      now.getMonth()
    );
  }
}
