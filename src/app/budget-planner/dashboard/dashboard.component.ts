import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule,SideNavComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    lastMonthsIncome=['January: $1000', 'February: $2000', 'March: $3000'];
    currentMonthIncome='$2000';

    lastMonthsExpenses=['January: $500', 'February: $1000', 'March: $1500'];
    currentMonthExpenses='$1000';

    totalCurrentMonthIncome=2000;
    totalCurrentMonthExpenses=1000;
    balance=1000;

    todoTransations=[
      {description:'Pay electricity bill'},
      {description:'Submit monthly report'},
      {description:'Buy groceseries'},
      {description:'Call insurance company'}
    ]

    constructor(private router:Router){

    }
    onIncome(){
      this.router.navigate(['/budget-planner/income']);
    }
    onExpense() {
      this.router.navigate(['/budget-planner/expense']);
    }
    onTodo() {
      this.router.navigate(['/budget-planner/todo']);
    }

    get currentMonthSavings():number{
      return this.totalCurrentMonthIncome-this.totalCurrentMonthExpenses;
    }
}
