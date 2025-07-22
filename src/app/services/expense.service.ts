import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly STORAGE_KEY = 'expenses';
  private readonly BUDGET_KEY = 'budget';

  private expenses: Expense[] = [];
  private budgetValue: number = 1000;

  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  private budgetSubject = new BehaviorSubject<number>(this.budgetValue);

  constructor() {
    this.loadFromStorage();
    this.loadBudgetFromStorage();
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

  private loadBudgetFromStorage(): void {
    if (this.isBrowser()) {
      const savedBudget = localStorage.getItem(this.BUDGET_KEY);
      this.budgetValue = savedBudget ? Number(savedBudget) : 1000;
      this.budgetSubject.next(this.budgetValue);
    }
  }

  private saveBudgetToStorage(): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.BUDGET_KEY, this.budgetValue.toString());
    }
  }

  setBudget(amount: number): void {
    this.budgetValue = amount;
    this.budgetSubject.next(this.budgetValue);
    this.saveBudgetToStorage();
  }

  getBudget(): Observable<number> {
    return this.budgetSubject.asObservable();
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

  getTotalByCategory(): { [category: string]: number } {
    return this.expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [category: string]: number });
  }
}
