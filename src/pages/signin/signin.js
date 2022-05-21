import template from "./signin.hbs";
import "./signin.css";

const data = {
  loginField: "Логин",
  passwordField: "Пароль",
  butonsigninField: "Войти",
  butonsignupField: "Зарегистрироваться",
};
export default function signinPage() {
  return template(data);
}

document.getElementById("root").innerHTML = signinPage();
