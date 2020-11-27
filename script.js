'use strict';

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
    mission: 150000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
            'Квартплата, проездной, кредит');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?'); 
 
                for (let i = 0; i < 2; i++) {
                    let expens = prompt('Введите обязательную статью расходов?');
                    let amout = +prompt('Во сколько это обойдется?');
                    appData.expenses[expens] = amout;
                    while(!isNumber(amout)){
                        amout = prompt('Во сколько это обойдется?');
                    }
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

for(let key in appData){
    console.log(`Наша программа включает в себя данные: ${key}: ${appData[key]}`);
}
