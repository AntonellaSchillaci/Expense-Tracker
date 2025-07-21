import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly STORAGE_KEY = 'expenses';
  private expenses: Expense[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadFromStorage(): void {
    if (this.isBrowser()) {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        this.expenses = JSON.parse(data);
      }
    }
  }

  private saveToStorage(): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.expenses));
    }
  }

  getExpenses(): Expense[] {
    return [...this.expenses];
  }

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
    this.saveToStorage();
  }

  removeExpense(id: number): void {
    this.expenses = this.expenses.filter(e => e.id !== id);
    this.saveToStorage();
  }

  getTotalAmount(): number {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }
}
