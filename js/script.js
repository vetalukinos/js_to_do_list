'use strict';

/*Достаем все необходимые эелементы*/
const todoControl = document.querySelector('.todo-control'),//Форма
    headerInput = document.querySelector('.header-input'),//Инпут, из которого извлекаем значение
    todoList = document.querySelector('.todo-list'),//ul-список, в который добавляем дела
    todoCompleted = document.querySelector('.todo-completed');//ul-список, в который добавляем ВЫПОЛНЕННЫЕ дела

/*Массив, который будет хранить дела*/

let todoData = JSON.parse(localStorage.getItem('newTodo'));
if (todoData === null) {
    todoData = [];
} else {
    todoData = JSON.parse(localStorage.getItem('newTodo'));
}


/*Функция, которая добавляет дела (рендерит вертску)*/
const render = function() {
    /*Очищаем*/
    todoList.textContent = '';
    todoCompleted.textContent = '';

    localStorage.setItem('newTodo', JSON.stringify(todoData));

    /*Перебираем массив todoData*/
    todoData.forEach(function(item, index) {

        if (item.value === '') {
            return;
        }

        const li = document.createElement('li');//создаем новй элемент li
        li.classList.add('todo-item');//добавляем класс

        //добавляем верстку в li
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

        //Проверка на выполненное дело
        if (item.completed) {
            todoCompleted.append(li);//Добавляем новое ВЫПОЛНЕННОЕ дело
        } else {
            todoList.append(li);//Добавляем новое дело
        }

        /*Меняем статус дела (выполнено/невыполнено)*/
        const btnTodoComplete = li.querySelector('.todo-complete');//получаем кнопку
        /*Навешиваем событие клика по кнопке*/
        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        /*Удаляем поле*/
        const btnTodoRemove = li.querySelector('.todo-remove');//получаем кнопку
        /*Навешиваем событие клика по кнопке*/
        btnTodoRemove.addEventListener('click', function() {
            todoData.splice(index, 1);
            render();
        });

    });

};

/*Навешиваем событие submit на форму*/
todoControl.addEventListener('submit', function(event) {
    event.preventDefault();//отменяем перезагрузку страницы при нажатии на Enter или "+"

    /*Создаем новый объект*/
    const newTodo = {
        value: headerInput.value,//добавляем значение инпута
        completed: false//по-умолчанию дело не выполнено (false)
    };

    /*При клике добавляем новый объект в массив todoData*/
    todoData.push(newTodo);//пушим объект

    headerInput.value = '';

    /*Вызываем функцию render, чтобы обновить список дел*/
    render();
});

/*Запускаем сразу, как только запустилась сама страница*/
render();





































/*function setCookie(key, value, year, month, day, path, domain, secure) {
    let cookieStr = encodeURI(key) + '=' + encodeURI(value); //Временная строка
    if (year) {//Если существует год
        //Экземпляр класса new Date
        const expires = new Date(year, month-1, day);//Три параметра
        cookieStr += '; expires=' + expires.toGMTString();
    }
    cookieStr += path ? '; path=' + encodeURI(path) : '';//Проверяем существует ли path
    cookieStr += domain ? '; domain=' + encodeURI(domain) : '';//Проверяем существует ли domain
    cookieStr += secure ? '; secure' : '';//Проверяем существует ли secure
    //Присваиваем времененную строку для cookie
    document.cookie = cookieStr;
}

setCookie('Привет', 'мир!');

setCookie('Любимый празник детей', 'Новый год', 2021, 1, 1);

console.log(decodeURI(document.cookie));*/
