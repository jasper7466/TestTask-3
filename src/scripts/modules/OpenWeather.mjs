// Класс для работы с API сервиса https://openweathermap.org/

// Импортируем модули и утилиты общего назначения
import { dateParser } from '../utilities/DateParser';
export class OpenWeather
{
    // Конструктор
    constructor(token = undefined)
    {
        this._moduleName = 'OpenWeather';                                // Название модуля (для формирования сообщений)
        this._URL = 'https://api.openweathermap.org/data/2.5/weather';   // Базовая часть адреса для запросов
        this._units = 'metric';     // Сиситема мер (metric/imperial)
        this._lang = 'ru';          // Язык
        this._key = token;           // Ключ для доступа к сервису
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
            recommends: undefined,
            main: undefined
        };
    }

    // Сеттер для ключа
    updateKey(token)
    {
        this._key = token;
    }

    _makeRecommend()
    {
        let text = '';
        const t = parseInt(this._data.temperature);

        switch(this._data.main)
        {
            case 'Thunderstorm':    text = 'Возможны грозы, будьте осторожнее или останьтесь дома. '; break;
            case 'Drizzle':
            case 'Rain':            text = 'На улице сыро и дождливо, не забудьте взять зонтик и обратите внимание на выбор обуви. '; break;
            case 'Snow':            text = 'В снежную погоду непромокаемая куртка с капюшоном явно не помешает .'; break;
            case 'Tornado':         text = 'На улице не безопасно. '; break;
            case 'Mist':
            case 'Smoke':
            case 'Haze':
            case 'Dust':
            case 'Fog':
            case 'Sand':
            case 'Ash':
            case 'Squall':          text = 'В воздухе присутствуют загрязнения. Позаботьтесь о защите органов дыхания и глаз. '; break;
            case 'Clear':           text = 'На небе ни облачка, защитите глаза и кожу от возможного воздействия солнечных лучей. '; break;
        }

        if (t > 30)
            text += 'На улице очень жарко, защитите себя от перегрева.';
        else if (t > 18)
            text += 'На улице достаточно тепло, одевайтесь по погоде.';
        else if (t > 10)
            text += 'На улице умеренно тепло. Возможно, стоит взять с собой что-то тёплое.';
        else if (t > 0)
            text += 'Прохладно. Куртка и шапка будут не лишними.';
        else if(t > -15)
            text += 'Умеренно холодно, одевайтесь теплее.';
        else if(t > -25)
            text += 'На улице холодно, одевайте тёплую одежду и обувь.';
        else
            text += 'Очень холодно, одевайте тёплую одежду и обувь. Защитите лицо и руки от обморожения.';

        return(text);
    }

    // Приватный метод для отправки запросов
    _sendRequest(URL)
    {
        // Отправляем запрос и возвращаем промис
        return fetch(URL)
            .then((res) => {
                if (res.ok)
                    return res.json();
                switch(res.status)
                {
                    case 401: return Promise.reject('Ошибка авторизации.'); break;
                    case 404: return Promise.reject('Ничего не найдено =('); break;
                }
                return Promise.reject(`${this._moduleName}. Error: ${res.status}`);
            })
            .then((res) => {
                // Парсим в объект, подготовленный для передачи в виджет
                this._data.city = res.name;
                this._data.timestamp = dateParser((res.dt) * 1000).printable;
                this._data.condition = res.weather[0].description;
                this._data.main = res.weather[0].main;
                this._data.icon = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
                this._data.temperature = Math.round(res.main.temp) + '°';
                this._data.feel = Math.round(res.main.feels_like) + ' °C';
                this._data.pressure = res.main.pressure + ' гПа';
                this._data.humidity = res.main.humidity + ' %';
                this._data.wind = res.wind.speed + ' м/с';
                this._data.recommends = this._makeRecommend();
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