import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly STORAGE_KEY = 'expenses';
  private expenses: Expense[] = [];

  private expensesSubject = new BehaviorSubject<Expense[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadFromStorage(): void {
    if (this.isBrowser()) {
      const data = localStorage.getItem(this.STORAGE_KEY);
      this.expenses = data ? JSON.parse(data) : [];
      this.updateExpensesSubject();
    }
  }

  private saveToStorage(): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.expenses));
    }
  }

  private updateExpensesSubject(): void {
    const sorted = [...this.expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.expensesSubject.next(sorted);
  }

  getExpenses(): Observable<Expense[]> {
    return this.expensesSubject.asObservable();
  }

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
    this.saveToStorage();
    this.updateExpensesSubject();
  }

  removeExpense(id: number): void {
    this.expenses = this.expenses.filter((e) => e.id !== id);
    this.saveToStorage();
    this.updateExpensesSubject();
  }

  updateExpense(updatedExpense: Expense): void {
    const index = this.expenses.findIndex((e) => e.id === updatedExpense.id);
    if (index !== -1) {
      this.expenses[index] = updatedExpense;
      this.saveToStorage();
      this.updateExpensesSubject();
    }
  }

  getTotalAmount(): number {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  getTotalAmountForMonth(year: number, month: number): number {
    return this.expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }
}
