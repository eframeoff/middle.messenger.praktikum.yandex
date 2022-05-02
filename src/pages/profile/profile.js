import template from "./profile.hbs";
import "./profile.css";
import image from "../../images/profile.jpg";
import arrow from "../../images/arrow.png";

const data = {
  first_name: "Иван",
  second_name: "Иванов",
  display_name: "IVA2",
  login: "IvanI",
  email: "yandex@yandex.ru",
  phone: "89221234567",
  image: image,
  arrow: arrow,
};

function profilePage() {
  return template(data);
}

document.getElementById("root").innerHTML = profilePage();
