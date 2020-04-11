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
        // this._root.classList.add('weather_hidden');

        // Вставляем в корневой элемент вёрстку виджета
        this._root.insertAdjacentHTML('beforeend',
        `
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

        this._location.appendChild(this._root);
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
    }
}