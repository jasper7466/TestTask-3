'use strict';

// Импортируем корневой файл стилей страницы
import '../styles/index.css';

// Импортируем модули и утилиты общего назначения
import { OpenWeather } from './modules/OpenWeather';

const weather = new OpenWeather(key);

weather.getWeather('Лондон')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally( () => {

    });
