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
const cancel = document.querySelector('#cancel');
const inputText = document.querySelectorAll('input[type=text]');
let income = document.querySelector('.income');
let expenses = document.querySelector('.expenses');

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

        this.budget = +salaryAmount.value;

        appData.getTargetMonth();
        appData.getStatusIncome();

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
     
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', '); // масиив объединяем в строку
        additionalIncomeValue.value = this.addIncome.join(', ');
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
        this.incomeMonth = 0;
        for(let key in this.income){
            this.incomeMonth += this.income[key];
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
        for(let key in this.expenses){
        sum += this.expenses[key];
        }
        this.expensesMonth = sum;
    },
    getBudget: function(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function(){
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    getStatusIncome: function(){
        if (this.budgetDay > 1200) {
            return 'У вас высокий уровень дохода';
        } else if (600 < this.budgetDay && this.budgetDay < 1200){
            return 'У вас средний уровень дохода';
        } else if (0 < this.budgetDay && this.budgetDay < 600){
            return 'У вас ниже среднего уровеня дохода';
        } else {
            return 'Что-то пошло не так';
        }
    },
    getInfoDeposit: function(){
        if(this.deposit){
            this.percentDeposit = prompt('Какой годовой процент?', '10');
            while(!isNumber(this.percentDeposit)){
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while(!isNumber(this.moneyDeposit)){
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
        }
    },
    calcPeriod: function(){
        return this.budgetMonth * periodSelect.value;
    },
    valuePeriod: function(){
        periodAmount.textContent = periodSelect.value;
        return periodAmount.textContent;
    },
    resetForm: function(){
        inputText.forEach(function(item, i){
            if(i <= 10) {
                item.value = '';
            }
        });
        let incomeInput = income.querySelectorAll('input[type=text]');
        incomeInput.forEach(function(item){
            item.value = '';
        });
        let expensesInput = expenses.querySelectorAll('input[type=text]');
        expensesInput.forEach(function(item){
            item.value = '';
        });
        unblock();
    }
};

// блокировка формы
function blockingForm(){
    inputText.forEach(function(item, i){
        if(i <= 10) {
            item.disabled = true;
        }
    });
    let incomeInput = income.querySelectorAll('input[type=text]');
    incomeInput.forEach(function(item){
        item.disabled = true;
    });
    let expensesInput = expenses.querySelectorAll('input[type=text]');
    expensesInput.forEach(function(item){
        item.disabled = true;
    });
    start.style.display = 'none';
    cancel.style.display = 'block';
}
// разблокировка формы
function unblock(){
    inputText.forEach(function(item, i){
        if(i <= 10) {
            item.disabled = false;
        }
    });
    let incomeInput = income.querySelectorAll('input[type=text]');
    incomeInput.forEach(function(item){
        item.disabled = false;
    });
    let expensesInput = expenses.querySelectorAll('input[type=text]');
    expensesInput.forEach(function(item){
        item.disabled = false;
    });
    start.style.display = 'block';
    cancel.style.display = 'none';
}

// привязка к объекту
function hardBind(){
    appData.start.call(appData);
}

function trackStart(){
    
    if(salaryAmount.value.trim() === ''){
        console.log('no');
        start.disabled = true;
    } else{
        console.log('yes');
        start.disabled = false;
        start.addEventListener('click', function(){
            hardBind();
            blockingForm();
        });
        expensesAdd.addEventListener('click', appData.addExpensesBlock);
        incomeAdd.addEventListener('click', appData.addIncomeBlock);
        periodSelect.addEventListener('input', appData.valuePeriod);
    }
}
salaryAmount.addEventListener('input', trackStart);
cancel.addEventListener('click', appData.resetForm);

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



let expensesAmout = appData.expensesMonth;

 
