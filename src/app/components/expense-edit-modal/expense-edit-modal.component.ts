import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
  } from '@angular/core';
  import { Expense } from '../../models/expense.model';
  import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
  } from '@angular/forms';
  
  @Component({
    selector: 'app-expense-edit-modal',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './expense-edit-modal.component.html',
    styleUrls: ['./expense-edit-modal.component.scss'],
  })
  export class ExpenseEditModalComponent implements OnChanges {
    @Input() expense!: Expense;
    @Output() save = new EventEmitter<Expense>();
    @Output() cancel = new EventEmitter<void>();
  
    expenseForm: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.expenseForm = this.fb.group({
        title: ['', Validators.required],
        amount: [0, [Validators.required, Validators.min(0.01)]],
        category: ['', Validators.required],
        date: ['', Validators.required],
      });
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['expense'] && this.expense) {
        this.expenseForm.patchValue({
          title: this.expense.title,
          amount: this.expense.amount,
          category: this.expense.category,
          date: this.expense.date,
        });
      }
    }
  
    onSave() {
      if (this.expenseForm.valid) {
        const updatedExpense: Expense = {
          ...this.expense,
          ...this.expenseForm.value,
        };
        this.save.emit(updatedExpense);
      }
    }
  
    onCancel() {
      this.cancel.emit();
    }
  }
  