import template from './signup.hbs'
import "./signup.css"
import arrow from "../../images/arrow.png";

const data = {
    emailField: "Почта",
    loginField: "Логин",
    first_nameField: "Имя",
    second_nameField: "Фамилия",
    phoneField: "Телефон",
    passwordField: "Пароль",
    repeat_passwordField: "Повторите пароль",
    butonsigninField: "Вернуться назад",
    butonsignupField: "Зарегистрироваться",
    arrow: arrow
}
function signupPage()  {
    return template(data)
}

document.getElementById('root').innerHTML = signupPage();

