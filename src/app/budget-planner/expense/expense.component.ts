import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth: string;
  expenses:{month:string,expenseAmount:number}[]=[
    {month:'January',expenseAmount:2000},
    {month:'February',expenseAmount:2050},
    {month:'March',expenseAmount:2250},
  ]

  januaryIncomes: any[] = [
    { expenseType:'Rent',expenseAmount:1000},
    { expenseType:'Groceries',expenseAmount:500},
    { expenseType:'Utilities',expenseAmount:200},
   
  ];

  februaryIncomes: any[] = [
    { expenseType:'Rent', expenseAmount:1200},
    { expenseType:'Groceries', expenseAmount:600},
    { expenseType:'Utilities', expenseAmount:150},
  ];

  marchIncomes: any[] = [
    { expenseType:'Rent', expenseAmount:1300},
    { expenseType:'Groceries', expenseAmount:700},
    { expenseType:'Utilities', expenseAmount:250},
  ];

  monthSelected: boolean = false;
  constructor(public fb: FormBuilder,public router:Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', {
      month: 'long',
    });
  }
  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required], 
    });
  }

  onSubmitExpense(){
    if(this.expenseForm.valid){
      const newExpense=this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset({month:this.selectedMonth});
    }
  }

  onChangeExpense(event: any) {
    if (event?.target?.value) {
      this.selectedMonth = event.target.value;
      this.monthSelected = true;
      this.getFilteredExpenses();
    } else {
      console.warn('Invalid event target in onChange');
    }
  }
  
  getFilteredExpenses() {
   
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryIncomes;
      case 'February':
        return this.februaryIncomes;
      case 'March':
        return this.marchIncomes;
      default:
        return [];
    }
  }

  calculateTotalExpense(month: string): number {
   return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  // onSave() {
  //   if(this.expenseForm.valid){
  //    this.expenseForm.reset({month:this.selectedMonth});
  //    this.getFilteredExpenses();
  //   }
  //  }

  saveForm() {
    console.log("form saved");
    }
    onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
    }

}
