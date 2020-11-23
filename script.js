'use strict';

let money = 10500;
let income = 'freelance'; 
let addExpenses ='Интернет, Такси, Коммуналка, Тренировка, Еда'; 
let deposit = true; 
let mission = 150000; 
let period = 8;

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);
console.log('addExpenses: ', addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLowerCase().split(', '));
let budgetDay = money / 30;
console.log('budgetDay:', budgetDay);

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
'Квартплата, проездной, кредит');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth);
period = mission / budgetMonth; 
console.log('Цель будет достигнута за: ' + Math.ceil(period)  + ' месяцев');

budgetDay = budgetMonth / 30;
console.log('бюджет на день: ' + Math.floor(budgetDay));

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (600 < budgetDay && budgetDay < 1200){
    console.log('У вас средний уровень дохода');
} else if (0 < budgetDay && budgetDay < 600){
    console.log('У вас ниже среднего уровеня дохода');
} else {
    console.log('Что то пошло не так');
}
    
