// Класс для работы с погодным виджетом
export class Weather
{
    // Конструктор
    constructor(location)
    {
        this._location = location;  // Ссылка на узел-контейнер

        // Формируем корневой элемент
        this._root = document.createElement('section');
        this._root.classList.add('weather');
        this._root.classList.add('weather_hidden');

        // Вставляем в корневой элемент вёрстку виджета
        this._root.insertAdjacentHTML('beforeend',
        `
            <div class="weather__banner weather__banner_hidden">
                <p class="weather__message">Идёт поиск</p>
            </div>
            <div class="weather__title-holder">
                <p class="weather__city">Город</p>
                <time class="weather__timestamp">Отметка времени</time>
                <p class="weather__condition">Состояние погоды</p>
            </div>
            <div class="weather__data-holder">
                <div class="weather__common-data">
                    <img class="weather__icon" src="" alt="Пиктограмма погоды">
                    <div class="weather__temperature">Т</div>
                    <div class="weather__record weather__record_feel-like">
                        <div class="weather__record weather__record_caption">Ощущается как&ensp;</div>
                        <div class="weather__record weather__record_data">Т</div>
                    </div>
                </div>
                <div class="weather__extra-data">
                    <div class="weather__record weather__record_pressure">
                        <div class="weather__record weather__record_caption">Атмосферное давление:&ensp;</div>
                        <div class="weather__record weather__record_data">ХХХХ мм.рт.ст.</div>
                    </div>
                    <div class="weather__record weather__record_humidity">
                        <div class="weather__record weather__record_caption">Влажность:&ensp;</div>
                        <div class="weather__record weather__record_data">ХХ %</div>
                    </div>
                    <div class="weather__record weather__record_wind">
                        <div class="weather__record weather__record_caption">Ветер:&ensp;</div>
                        <div class="weather__record weather__record_data">Х м/с, Х</div>
                    </div>
                </div>
            </div>
            <p class="weather__recommends">Рекомендации</p>
        `);
        
        // Получаем ссылки на нужные узлы структуры виджета
        this._city = this._root.querySelector('.weather__city');
        this._timestamp = this._root.querySelector('.weather__timestamp');
        this._condition = this._root.querySelector('.weather__condition');
        this._icon = this._root.querySelector('.weather__icon');
        this._temperature = this._root.querySelector('.weather__temperature');
        this._feel = this._root.querySelector('.weather__record_feel-like').querySelector('.weather__record_data');
        this._pressure = this._root.querySelector('.weather__record_pressure').querySelector('.weather__record_data');
        this._humidity = this._root.querySelector('.weather__record_humidity').querySelector('.weather__record_data');
        this._wind = this._root.querySelector('.weather__record_wind').querySelector('.weather__record_data');
        this._recommends = this._root.querySelector('.weather__recommends');
        this._banner = this._root.querySelector('.weather__banner');
        this._message = this._root.querySelector('.weather__message');

        this._location.appendChild(this._root);
    }

    // Приватный метод для отображения баннера
    _bannerShow()
    {
        this._banner.classList.remove('weather__banner_hidden');
    }

    // Метод для скрытия баннера
    bannerHide()
    {
        this._banner.classList.add('weather__banner_hidden');
    }

    // Метод для отображения баннера ожидания
    bannerAwait()
    {
        this._message.textContent = 'Идёт поиск...';
        this._root.classList.remove('weather_hidden');
        this._bannerShow();
    }

    // Метод для отображения баннера с ошибкой
    bannerError(err)
    {
        this._message.textContent = err;
        this._root.classList.remove('weather_hidden');
        this._bannerShow();
    }

    // Метод для принудительного обновления информации в виджете
    directUpdate(data)
    {
        this._city.textContent = data.city;
        this._timestamp.textContent = data.timestamp;
        this._condition.textContent = data.condition;
        this._icon.src = data.icon;
        this._temperature.textContent = data.temperature;
        this._feel.textContent = data.feel;
        this._pressure.textContent = data.pressure;
        this._humidity.textContent = data.humidity;
        this._wind.textContent = data.wind;
        this._recommends.textContent = data.recommends;
        this._root.classList.remove('weather_hidden');
    }
}