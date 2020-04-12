// Класс для работы с формой ввода
export class InputForm
{
    // Конструктор
    constructor(form, submitHandler)
    {
        this._form = form;                      // Форма
        this._key = this._form.elements[0];     // Ссылка на поле ввода ключа
        this._input = this._form.elements[1];   // Ссылка на поле ввода запроса
        this._button = this._form.elements[2];  // Ссылка на кнопку отправки

        // Добавляем слушателя на событие подтверждения отправки формы
        this._form.addEventListener('submit', (event) => submitHandler(event));
    }

    // Метод для блокировки формы
    lock()
    {
        this._button.setAttribute('disabled', 'true');
        this._input.setAttribute('disabled', 'true');
        this._key.setAttribute('disabled', 'true');
        this._form.classList.add('input__form_disabled');
    }

    // Метод для разблокировки формы
    unlock()
    {
        this._button.removeAttribute('disabled');
        this._input.removeAttribute('disabled');
        this._key.removeAttribute('disabled');
        this._form.classList.remove('input__form_disabled');
    }
}