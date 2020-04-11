// Функция для обработки входяшщей строки

export function TextProcessor(str)
{
    // Объявляем объект, который будет возвращён как результат работы функции
    const outputData = {
        source: 'TextProcessor error. Invalid input data format',   // для "подготовленной" строки (после необходимых модификаций)
        processed: ['TextProcessor error. Invalid input data format']  // для результирующего массива
    }

    // 1. Проверяем, что на вход нам передали именно строку
    if(typeof str !== 'string')
    {
        console.log('TextProcessor error. Invalid input data format');
        return(outputData);
    }

    // 2. Чистим входную строку от возможного недопустимого содержимого
    outputData.source = str.replace(/[^A-Za-zА-Яа-яЁё,\d]/g, '');

    // 3. Приводим всё к единому регистру
    outputData.source = outputData.source.toLocaleLowerCase();

    // 4. Разбиваем строку на массив сторок. Разделитель - запятая
    outputData.processed = outputData.source.split(',');

    // 5. Проходим по всем словам
    outputData.processed = outputData.processed.map( (value) => {
        let accumulator = '';                       // Объявляем переменную-аккумулятор
        while(value.length != 0)                    // Пока строка не редуцируется до нулевой
        {
            accumulator += value[0];                // Забираем 1й символ в "аккумулятор"
            value = value.split(value[0]).join(''); // Остальные вхождения - удалаяем
        }
        return(accumulator);
    });

    return(outputData);
}