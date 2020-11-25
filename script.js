'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n); // проверка на числовое значение, true - если значение число;
};

let money;
let income = 'freelance'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
'Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?'); 
let mission = 150000; 

let start = function() {
    
    do {
        money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money)); // пока money === false, действие будет продолжаться
};

start();

function showTypeOf(data){
    console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);

console.log(addExpenses.toLowerCase().split(', '));

let expenses = [];
let amout;

function getExpensesMonth(){
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        amout = prompt('Во сколько это обойдется?');
        while(!isNumber(amout)){
            amout = prompt('Во сколько это обойдется?');
        }
        sum += +amout;
    }
    console.log(expenses);
    return sum;
}

let expensesAmout = getExpensesMonth();
console.log('сумму всех обязательных расходов за месяц: ', expensesAmout);

function getAccumulatedMonth(){
    return money - expensesAmout;
}
let accumulatedMonth = getAccumulatedMonth();
console.log('Бюджет на месяц: ', accumulatedMonth);

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('бюджет на день: ', budgetDay);

function getStatusIncome(){
    if (budgetDay > 1200) {
        return 'У вас высокий уровень дохода';
    } else if (600 < budgetDay && budgetDay < 1200){
        return 'У вас средний уровень дохода';
    } else if (0 < budgetDay && budgetDay < 600){
        return 'У вас ниже среднего уровеня дохода';
    } else {
        return 'Что-то пошло не так';
    }
}
console.log(getStatusIncome());


function getTargetMonth(){
    if (Math.ceil(mission / accumulatedMonth) > 0) {
        return 'Цель будет достигнута';
    } else {
        return 'Цель не будет достигнута';
    }
    
}
console.log(getTargetMonth());