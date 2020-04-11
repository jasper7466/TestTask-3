// Класс для работы с API сервиса https://openweathermap.org/
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