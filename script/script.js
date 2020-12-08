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
let inputText = document.querySelectorAll('input[type=text]');
let income = document.querySelector('.income');
let expenses = document.querySelector('.expenses');
let incomeInput = income.querySelectorAll('.income-items');

        
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n); // проверка на числовое значение, true - если значение число;
};


const AppData = function(){
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
};

AppData.prototype.start = function() {
    const _this = this;
    //пересчет период сразу
    periodSelect.addEventListener('input', function(){ 
        _this.calcPeriod();
        incomePeriodValue.value = _this.calcPeriod();
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
 
};

AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', '); // масиив объединяем в строку
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = _this.getTargetMonth();
    incomePeriodValue.value = _this.calcPeriod();
};
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.firstElementChild.value = '';
    cloneExpensesItem.lastElementChild.value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        expensesAdd.style.display = 'none';
    }
};
AppData.prototype.addIncomeBlock = function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.firstElementChild.value = '';
    cloneIncomeItem.lastElementChild.value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
        incomeAdd.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function(){
    const _this = this;
     expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function(){
    const _this = this;
     incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){
           _this.income[itemIncome] = +cashIncome;
        }
        return _this.income;
    });
    this.incomeMonth = 0;
    for(let key in this.income){
        this.incomeMonth += this.income[key];
    }
};
AppData.prototype.getAddExpenses = function(){
    this.addExpenses = [];
    const _this = this;
     let addExpenses = additionalExpensesItem.value.split(','); // разбиваем на массив
    addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== ''){
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function(){
    this.addIncome = [];
    const _this = this;
     additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function(){
     let sum = 0;
    for(let key in this.expenses){
    sum += this.expenses[key];
    }
    this.expensesMonth = sum;
};
AppData.prototype.getBudget = function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function(){
    return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function(){
    if (this.budgetDay > 1200) {
        return 'У вас высокий уровень дохода';
    } else if (600 < this.budgetDay && this.budgetDay < 1200){
        return 'У вас средний уровень дохода';
    } else if (0 < this.budgetDay && this.budgetDay < 600){
        return 'У вас ниже среднего уровеня дохода';
    } else {
        return 'Что-то пошло не так';
    }
};
AppData.prototype.getInfoDeposit = function(){
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
};
AppData.prototype.calcPeriod = function(){
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.valuePeriod = function(){
    periodAmount.textContent = periodSelect.value;
    return periodAmount.textContent;
};
AppData.prototype.resetForm = function(){
   
    inputText.forEach(function(item){
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
    
    function unblock(){
        // разблокировка формы
        inputText.forEach(function(item, i){
            if(i <= 10) {
                item.disabled = false;
            }
        });
        let incomeInputText = income.querySelectorAll('input[type=text]');
        incomeInputText.forEach(function(item){
            item.disabled = false;
        });
        let expensesInput = expenses.querySelectorAll('input[type=text]');
        expensesInput.forEach(function(item){
            item.disabled = false;
        });
        start.style.display = 'block';
        cancel.style.display = 'none';
    }
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
    
    unblock();
};
AppData.prototype.eventListeners = function(){
    const _this = this;
    // // привязка к объекту
    function hardBind(){
        _this.start.call(_this);
    }
    
    function trackStart(){
    
         // блокировка формы
        function blockingForm() {
            inputText.forEach(function(item, i){
                if(i <= 10) {
                    item.disabled = true;
                }
            });
            let incomeInputText = income.querySelectorAll('input[type=text]');
            incomeInputText.forEach(function(item){
                item.disabled = true;
            });
            let expensesInput = expenses.querySelectorAll('input[type=text]');
            expensesInput.forEach(function(item){
                item.disabled = true;
            });
            start.style.display = 'none';
            cancel.style.display = 'block';
        }
    
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
            expensesAdd.addEventListener('click', _this.addExpensesBlock);
            incomeAdd.addEventListener('click', _this.addIncomeBlock);
            periodSelect.addEventListener('input', _this.valuePeriod);

        }
    }
    salaryAmount.addEventListener('input', trackStart);
    cancel.addEventListener('click', _this.resetForm);

    
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
};

const appData = new AppData();
appData.eventListeners();

    















 
