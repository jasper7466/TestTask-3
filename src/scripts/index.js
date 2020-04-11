'use strict';

// Импортируем корневой файл стилей страницы
import '../styles/index.css';

// Импортируем необходимые модули из блоков
import { Weather } from '../blocks/weather/weather.mjs';
import { InputForm } from '../blocks/input/input.mjs';

// Импортируем модули и утилиты общего назначения
import { OpenWeather } from './modules/OpenWeather.mjs';

// Получаем ссылки на необходимые узлы структуры документа
const main = document.querySelector('.main');               // Блок main
const form = document.querySelector('.input__form');        // Форма ввода
const city = document.querySelector('.input__city');        // Поле "Город"

// Объявляем экземпляр класса InputForm, в конструктор передаём ссылку на форму и обработчик отправки
const input = new InputForm(form, submitHandler);

// Объявляем экземпляр класса Weather, в конструктор передаём желаемое расположение виджета
const widget = new Weather(main);

// Объявляем экземпляр класса для работы с API, в конструктор передаём токен
const weather = new OpenWeather(key);

form.setAttribute('disabled', true);

// Функция-обработчик события отправки формы
const submitHandler = function(event) {
    event.preventDefault();                 // Отключаем поведение по умолчанию
    input.lock();                           // Блокируем форму ввожа
    widget.bannerAwait();                   // На виджете показываем прелоудер
    weather.getWeather(city.value)          // Читаем город из формы и инициируем запрос
        .then((data) => {
            widget.directUpdate(data);      // Если ответ пришёл - обновляем виджет
            widget.bannerHide();            // Прячем прелоудер
        })
        .catch((err) => {
            widget.bannerError(err);        // Если что-то пошло не так - показываем ошибку
        })
        .finally(() => {
            input.unlock();                 // В любом случае снимаем блокировку с формы ввода
        });
}

// Подвешиваем слушателя на событие подтверждения формы ввода
form.addEventListener('submit', (event) => submitHandler(event));
    
