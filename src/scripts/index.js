'use strict';

// Импортируем корневой файл стилей страницы
import '../styles/index.css';

// Импортируем модули и утилиты общего назначения
import { TextProcessor } from './utilities/TextProcessor';

// Получаем ссылки на необходимые узлы структуры документа
const slicerForm = document.querySelector('.slicer__form');             // Форма "слайсера"
//const submitButton = document.querySelector('.slicer__button');       // Кнопка "Slice!"
const phoneButton = document.querySelector('.author__phone_button');    // Кнопка "Показать телефон"
const inputField = document.querySelector('.slicer__data_input');       // Поле для ввода данных
const outputField = document.querySelector('.slicer__data_output');     // Поле для вывода данных

// Обработчик кнопки "Slice"
const slicerSubmitHandler = function(event) {
    // Отключаем дефолтное поведение формы
    event.preventDefault();
    // Инициируем обработку строки
    let result = TextProcessor(inputField.value);
    // Возвращаем в поле ввода подготовленную строку, чтобы пользователь её увидел
    inputField.value = result.source;
    // Возвращаем в поле вывода результирующий массив строк
    outputField.value = result.processed;
}

// Обработчик кнопки "Показать телефон"
const phoneButtonHandler = function(event) {
    // Прячем кнопку верхнего слоя
    event.target.classList.add('author__phone_hidden');
    // Удаляем слушателя
    event.target.removeEventListener('click', phoneButtonHandler);
    // не уверен, что удаление срабатывает, т.к. в DevTools браузера слушатель отображается
}

// Развешиваем слушателей событий
slicerForm.addEventListener('submit', (event) => slicerSubmitHandler(event));
phoneButton.addEventListener('click', (event) => phoneButtonHandler(event), {once: true});