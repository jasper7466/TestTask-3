// Класс для работы с API сервиса https://openweathermap.org/

// Импортируем модули и утилиты общего назначения
import { dateParser } from '../utilities/DateParser';
export class OpenWeather
{
    // Конструктор
    constructor(key)
    {
        this._moduleName = 'OpenWeather';                                // Название модуля (для формирования сообщений)
        this._URL = 'https://api.openweathermap.org/data/2.5/weather';   // Базовая часть адреса для запросов
        this._units = 'metric';     // Сиситема мер (metric/imperial)
        this._lang = 'ru';          // Язык
        this._key = key;            // Ключ для доступа к сервису
        // this._raw = undefined;      // Сюда будут помещаться "сырые" данные, полученные от сервиса (общий случай)
        this._data = {              // Объект с подготовленными для отображения в виджете данными (конкретно наш случай)
            city: undefined,
            timestamp: undefined,
            condition: undefined,
            icon: undefined,
            temperature: undefined,
            feel: undefined,
            pressure: undefined,
            humidity: undefined,
            wind: undefined,
            recommends: undefined
        };
    }

    // Приватный метод для отправки запросов
    _sendRequest(URL)
    {
        // Отправляем запрос и возвращаем промис
        return fetch(URL)
            .then((res) => {
                if (res.ok)
                    return res.json();
                return Promise.reject(`${this._moduleName}. Error: ${res.status}`);
            })
            .then((res) => {
                console.log(res);
                // Делаем глубокую копию данных
                this._raw = JSON.parse(JSON.stringify(res));

                // Парсим в объект, подготовленный для передачи в виджет
                this._data.city = res.name;
                this._data.timestamp = dateParser((res.dt) * 1000).printable;
                this._data.condition = res.weather[0].description;
                this._data.icon = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
                this._data.temperature = Math.round(res.main.temp) + '°';
                this._data.feel = Math.round(res.main.feels_like) + ' °C';
                this._data.pressure = res.main.pressure + ' гПа';
                this._data.humidity = res.main.humidity + ' %';
                this._data.wind = res.wind.speed + ' м/с';
                this._data.recommends = 'dummy';
                console.log(this._data);
                return(this._data);
            })
            .catch((err) => {
                console.log(`${this._moduleName}. Request failed: ${err}`);
                return Promise.reject(err);
            });
    }

    getWeather(query)
    {
        // Формируем URL
        const URL = `${this._URL}?q=${query}&units=${this._units}&lang=${this._lang}&appid=${this._key}`;
        // Инициируем отправку запроса, возвращаем промис
        return this._sendRequest(URL);
    }
}