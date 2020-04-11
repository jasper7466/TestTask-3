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

const d = {
    city: 'Челябинск',
    timestamp: 'test',
    condition: 'Ясно',
    icon: 'http://openweathermap.org/img/wn/09d@2x.png',
    temperature: '15',
    feel: '11',
    pressure: '1000',
    humidity: '40',
    wind: '4 м/с, С',
    recommends: 'Оденься теплее'
}

widget.directUpdate(d)

// const weather = new OpenWeather(key);

// weather.getWeather('Лондон')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
//     .finally( () => {

//     });
