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
console.log(`Период равен ${period} месяцев`)
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLowerCase().split(', '));
let budgetDay = money / 30;
console.log('budgetDay:', budgetDay);