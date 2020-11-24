'use strict';

let money = +prompt('Ваш месячный доход?');
let income = 'freelance'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
'Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?'); 
let mission = 150000; 

function showTypeOf(data){
    console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLowerCase().split(', '));


let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let amount2 = +prompt('Во сколько это обойдется?');

function getAccumulatedMonth(){
    return money - amount1 - amount2;
}
let accumulatedMonth = getAccumulatedMonth();
console.log('Бюджет на месяц: ', accumulatedMonth);

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('бюджет на день: ' + budgetDay);

function getStatusIncome(){
    if (budgetDay > 1200) {
        return 'У вас высокий уровень дохода';
    } else if (600 < budgetDay && budgetDay < 1200){
        return 'У вас средний уровень дохода';
    } else if (0 < budgetDay && budgetDay < 600){
        return 'У вас ниже среднего уровеня дохода';
    } else {
        return 'Что то пошло не так';
    }
}
console.log(getStatusIncome());

function getExpensesMonth(){
    return amount1 + amount2;
}
console.log('сумму всех обязательных расходов за месяц: ' + getExpensesMonth());

function getTargetMonth(){
    return Math.ceil(mission / accumulatedMonth);
}
console.log('Цель будет достигнута за: ' + getTargetMonth()  + ' месяцев');