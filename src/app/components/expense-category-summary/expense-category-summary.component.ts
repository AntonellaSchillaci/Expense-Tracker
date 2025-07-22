import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-category-summary',
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-category-summary.component.html',
  styleUrls: ['./expense-category-summary.component.scss'],
  standalone: true,
})
export class ExpenseCategorySummaryComponent implements OnChanges {
  @Input() expenses: Expense[] = [];

  categoryTotals: { [category: string]: number } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses']) {
      this.calculateCategoryTotals();
    }
  }

  private calculateCategoryTotals(): void {
    this.categoryTotals = {};

    for (const expense of this.expenses) {
      const category = expense.category || 'Altro';
      if (!this.categoryTotals[category]) {
        this.categoryTotals[category] = 0;
      }
      this.categoryTotals[category] += expense.amount;
    }
  }

  get categories(): string[] {
    return Object.keys(this.categoryTotals);
  }

  getAmount(category: string): number {
    return this.expenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
  }

  totalExpenses(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  getCategoryIcon(category: string): string {
    switch (category.toLowerCase()) {
      case 'cibo':
        return 'fas fa-utensils';
      case 'trasporti':
        return 'fas fa-bus';
      case 'bollette':
        return 'fas fa-file-invoice-dollar';
      case 'tempo libero':
        return 'fas fa-gamepad';
      case 'salute':
        return 'fas fa-heartbeat';
      case 'vestiti':
        return 'fas fa-tshirt';
      case 'viaggi':
        return 'fas fa-plane';
      case 'bellezza':
        return 'fas fa-spa';
      case 'casa':
        return 'fas fa-home';
      default:
        return 'fas fa-receipt';
    }
  }
}
