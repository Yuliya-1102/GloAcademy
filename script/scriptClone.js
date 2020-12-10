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
const income = document.querySelector('.income');
const expenses = document.querySelector('.expenses');
const incomeInput = income.querySelectorAll('.income-items');

        
let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n); // проверка на числовое значение, true - если значение число;
};

class AppData {
    constructor(income, incomeMonth, addIncome, expenses, addExpenses, deposit, percentDeposit, moneyDeposit, budget, budgetDay, budgetMonth, expensesMonth){
        this.income = income;
        this.incomeMonth = incomeMonth; 
        this.addIncome = addIncome;
        this.expenses = expenses;
        this.addExpenses = addExpenses;
        this.deposit = deposit;
        this.percentDeposit = percentDeposit;
        this.moneyDeposit = moneyDeposit;
        this.budget = budget;
        this.budgetDay = budgetDay;
        this.budgetMonth = budgetMonth;
        this.expensesMonth = expensesMonth;
    }
    start() {
        //пересчет период сразу
        periodSelect.addEventListener('input', () => { 
            this.calcPeriod();
            incomePeriodValue.value = this.calcPeriod();
        });
    
        this.budget = +salaryAmount.value;
    
        this.getTargetMonth();
        this.getStatusIncome();
    
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
     
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', '); // масиив объединяем в строку
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
    }
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.firstElementChild.value = '';
        cloneExpensesItem.lastElementChild.value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesAdd.style.display = 'none';
        }
    }
    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.firstElementChild.value = '';
        cloneIncomeItem.lastElementChild.value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomeAdd.style.display = 'none';
        }
    }
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    }
    getIncome() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
            this.income[itemIncome] = +cashIncome;
            }
            return this.income;
        });
        this.incomeMonth = 0;
        for(let key in this.income){
            this.incomeMonth += this.income[key];
        }
    }
    getAddExpenses() {
        this.addExpenses = [];
        let addExpenses = additionalExpensesItem.value.split(','); // разбиваем на массив
        addExpenses.forEach((item) => {
            item = item.trim();
            if(item !== ''){
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        this.addIncome = [];
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth() {
        let sum = 0;
        for(let key in this.expenses){
        sum += this.expenses[key];
        }
        this.expensesMonth = sum;
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getStatusIncome() {
        if (this.budgetDay > 1200) {
            return 'У вас высокий уровень дохода';
        } else if (600 < this.budgetDay && this.budgetDay < 1200){
            return 'У вас средний уровень дохода';
        } else if (0 < this.budgetDay && this.budgetDay < 600){
            return 'У вас ниже среднего уровеня дохода';
        } else {
            return 'Что-то пошло не так';
        }
    }
    getInfoDeposit() {
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
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    valuePeriod() {
        periodAmount.textContent = periodSelect.value;
        return periodAmount.textContent;
    }
    resetForm() {

        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        periodSelect.value = 1;
        periodAmount.textContent = 1;
        
        inputText.forEach((item) => {
            item.value = '';
        });
        
    
        if(incomeItems.length > 1){
            for(let i=1; i < incomeItems.length; i++){
                incomeItems[i].parentNode.removeChild(incomeItems[i]);
                incomeAdd.style.display = 'block';
            }
        }
        if(expensesItems.length > 1){
            for(let i=1; i < expensesItems.length; i++){
                expensesItems[i].parentNode.removeChild(expensesItems[i]);
                expensesAdd.style.display = 'block';
            }
        }
        
        let unblock = () => {
            // разблокировка формы
            inputText.forEach((item, i) => {
                if(i <= 10) {
                    item.disabled = false;
                }
            });
            let incomeInputText = income.querySelectorAll('input[type=text]');
            incomeInputText.forEach((item) => {
                item.disabled = false;
            });
            let expensesInput = expenses.querySelectorAll('input[type=text]');
            expensesInput.forEach((item) => {
                item.disabled = false;
            });
            start.style.display = 'block';
            cancel.style.display = 'none';
        };
        
        unblock();
    }
    eventListeners() {
        // // привязка к объекту
        let hardBind = () => {
            this.start.call(this);
        };
        
        let trackStart = () => {
        
            // блокировка формы
            let blockingForm = () => {
                inputText.forEach((item, i) => {
                    if(i <= 10) {
                        item.disabled = true;
                    }
                });
                let incomeInputText = income.querySelectorAll('input[type=text]');
                incomeInputText.forEach((item) => {
                    item.disabled = true;
                });
                let expensesInput = expenses.querySelectorAll('input[type=text]');
                expensesInput.forEach((item) => {
                    item.disabled = true;
                });
                start.style.display = 'none';
                cancel.style.display = 'block';
            };
        
            if(salaryAmount.value.trim() === ''){
                console.log('no');
                start.disabled = true;
            } else{
                console.log('yes');
                start.disabled = false;
        
                start.addEventListener('click', () => {
                    hardBind();
                    blockingForm();
                });
                expensesAdd.addEventListener('click', this.addExpensesBlock);
                incomeAdd.addEventListener('click', this.addIncomeBlock);
                periodSelect.addEventListener('input', this.valuePeriod);

            }
        };
        salaryAmount.addEventListener('input', trackStart);
        cancel.addEventListener('click', this.resetForm.bind(this));

        
        document.addEventListener('input', () => {
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
    }
}
const appData = new AppData({}, 0, [], {}, [], false, 0, 0, 0, 0, 0, 0);
appData.eventListeners();

    

        













 
