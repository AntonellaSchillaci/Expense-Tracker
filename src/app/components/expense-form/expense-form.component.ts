import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
    selector: 'app-expense-form',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './expense-form.component.html',
    styleUrls: ['./expense-form.component.scss']
  })
  export class ExpenseFormComponent {
    
  }