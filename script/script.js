'use strict';

let start = document.getElementById('start'),
            incomeAdd = document.getElementsByTagName('button')[0],
            expensesAdd = document.getElementsByTagName('button')[1],
            depositCheck = document.querySelector('#deposit-check'),
            additionalIncomeItem = document.querySelectorAll('additional_income-item'),
            budgetMonthValue = document.getElementsByClassName('budget_month-value'),
            budgetDayValue = document.getElementsByClassName('budget_day-value'),
            expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
            additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
            additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
            incomePeriodValue = document.getElementsByClassName('income_period-value'),
            targetMonthValue = document.getElementsByClassName('target_month-value'),
            salaryAmount =  document.querySelector('.salary-amount'),
            incomeTitle =  document.querySelector('.income-title'),
            incomeAmount =  document.querySelector('.income-amount'),
            expensesTitle =  document.querySelector('.expenses-title'),
            expensesAmount =  document.querySelector('.expenses-amount'),
            additionalExpensesItem =  document.querySelector('.additional_expenses-item'),
            depositAmount =  document.querySelector('.deposit-amount'),
            depositPercent =  document.querySelector('.deposit-percent'),
            targetAmount =  document.querySelector('.target-amount'),
            periodSelect =  document.querySelector('.period-select');

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n); // проверка на числовое значение, true - если значение число;
};

let money;
let start = function() {
    do {
       money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money)); // пока money === false, действие будет продолжаться
    return money;
};
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 150000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){

        if(confirm('Есть ли у вас дополнительный источник заработка?')){
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            while(!isNaN(itemIncome)){
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            }
            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            while(!isNumber(cashIncome)){
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            }
          
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
            'Квартплата, проездной, кредит');
            appData.addExpenses = addExpenses.split(',');
            appData.addExpenses = appData.addExpenses.map((item) => {
                return item.trim().slice(0, 1).toLocaleUpperCase() + item.trim().slice(1).toLowerCase();
            });
            
            appData.deposit = confirm('Есть ли у вас депозит в банке?'); 
 
                for (let i = 0; i < 2; i++) {
                    let expens = prompt('Введите обязательную статью расходов?');
                    while(!isNaN(expens)){
                        expens = prompt('Введите обязательную статью расходов?');
                    }
                    let amout = prompt('Во сколько это обойдется?');
                    while(!isNumber(amout)){
                        amout = prompt('Во сколько это обойдется?');
                    }
                    appData.expenses[expens] = +amout;
                }
    },
    getExpensesMonth: function(){
        let sum = 0;
        for(let key in appData.expenses){
        sum += appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        if (Math.ceil(appData.mission / appData.budgetMonth) > 0) {
            return 'Цель будет достигнута за: ' + Math.ceil(appData.mission / appData.budgetMonth) + ' месяца';
        } else {
            return 'Цель не будет достигнута';
        }
    },
    getStatusIncome: function(){
        if (appData.budgetDay > 1200) {
            return 'У вас высокий уровень дохода';
        } else if (600 < appData.budgetDay && appData.budgetDay < 1200){
            return 'У вас средний уровень дохода';
        } else if (0 < appData.budgetDay && appData.budgetDay < 600){
            return 'У вас ниже среднего уровеня дохода';
        } else {
            return 'Что-то пошло не так';
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            while(!isNumber(appData.percentDeposit)){
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while(!isNumber(appData.moneyDeposit)){
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
        }
    },
    calcSaveMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

let expensesAmout = appData.expensesMonth;
console.log('сумму всех обязательных расходов за месяц: ', expensesAmout);
console.log(appData.getTargetMonth());
console.log('Уровень дохода ', appData.budgetMonth);
console.log(appData.addExpenses);

for(let key in appData){
    console.log(`Наша программа включает в себя данные: ${key}: ${appData[key]}`);
}
    