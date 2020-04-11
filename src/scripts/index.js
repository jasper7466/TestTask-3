'use strict';

// Импортируем корневой файл стилей страницы
import '../styles/index.css';

// Импортируем необходимые модули из блоков
import { Weather } from '../blocks/weather/weather.mjs';

// Импортируем модули и утилиты общего назначения
import { OpenWeather } from './modules/OpenWeather';

// Получаем ссылки на необходимые узлы структуры документа
const main = document.querySelector('.main');               // Блок main

// Объявляем экземпляр класса Weather, в конструктор передаём желаемое расположение виджета
const widget = new Weather(main);



const weather = new OpenWeather(key);

weather.getWeather('Лондон')
    .then((data) => {
        widget.directUpdate(data);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally( () => {

    });
