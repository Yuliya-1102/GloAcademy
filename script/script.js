'use strict';

const start = document.getElementById('start');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount =  document.querySelector('.salary-amount');
const incomeTitle =  document.querySelectorAll('.income-title')[1];
let incomeItems = document.querySelectorAll('.income-items');
const expensesTitle =  document.querySelectorAll('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items'); 
const additionalExpensesItem =  document.querySelector('.additional_expenses-item');
const depositAmount =  document.querySelector('.deposit-amount');
const depositPercent =  document.querySelector('.deposit-percent');
const targetAmount =  document.querySelector('.target-amount');
const periodSelect =  document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const incomeAmount = document.querySelector('.income-amount'); 
const expensesAmount = document.querySelector('.expenses-amount');



let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n); // проверка на числовое значение, true - если значение число;
};


let appData = {
    income: {},
    incomeMonth: 0, //сюда передать данные из getIncome()
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    start: function() {
        
        //пересчет период сразу
        periodSelect.addEventListener('input', function(){ 
            appData.calcPeriod();
            incomePeriodValue.value = appData.calcPeriod();
        });

        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', '); // масиив объединяем в строку
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.firstElementChild.value = '';
        cloneExpensesItem.lastElementChild.value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesAdd.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.firstElementChild.value = '';
        cloneIncomeItem.lastElementChild.value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomeAdd.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
               appData.income[itemIncome] = +cashIncome;
            }
            return appData.income;
        });
        appData.incomeMonth = 0;
        for(let key in appData.income){
            appData.incomeMonth += appData.income[key];
        }
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(','); // разбиваем на массив
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function(){
        let sum = 0;
        for(let key in appData.expenses){
        sum += appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
    },
    valuePeriod: function(){
        periodAmount.textContent = periodSelect.value;
        return periodAmount.textContent;
    }
};

function trackStart(){
    if(salaryAmount.value === ''){
        console.log('no');
        start.disabled = true;
    } else{
        console.log('yes');
        start.disabled = false;
        start.addEventListener('click', appData.start);
        expensesAdd.addEventListener('click', appData.addExpensesBlock);
        incomeAdd.addEventListener('click', appData.addIncomeBlock);
        periodSelect.addEventListener('input', appData.valuePeriod);
    }
}
salaryAmount.addEventListener('input', trackStart);

document.addEventListener('input', function(){
    salaryAmount.value = salaryAmount.value.replace (/[^\+\d]/g, '');
    incomeAmount.value = incomeAmount.value.replace (/[^\+\d]/g, '');
    expensesAmount.value = expensesAmount.value.replace (/[^\+\d]/g, '');
    targetAmount.value = targetAmount.value.replace (/[^\+\d]/g, '');

    incomeTitle.value = incomeTitle.value.replace (/[^А-Яа-яЁё .,]/g, '');
    additionalIncomeItem[0].value = additionalIncomeItem[0].value.replace (/[^А-Яа-яЁё .,]/g, '');
    additionalIncomeItem[1].value = additionalIncomeItem[1].value.replace (/[^А-Яа-яЁё .,]/g, '');
    expensesTitle[1].value = expensesTitle[1].value.replace (/[^А-Яа-яЁё .,]/g, '');
    additionalExpensesItem.value = additionalExpensesItem.value.replace (/[^А-Яа-яЁё .,]/g, '');

});
appData.getTargetMonth();
appData.getStatusIncome();

let expensesAmout = appData.expensesMonth;

 
