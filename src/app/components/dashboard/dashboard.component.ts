import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExpenseTotalComponent } from '../expense-total/expense-total.component';
import { Location } from '@angular/common';
import { ExpenseChartsComponent } from '../expense-charts/expense-charts.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ExpenseTotalComponent, ExpenseChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
