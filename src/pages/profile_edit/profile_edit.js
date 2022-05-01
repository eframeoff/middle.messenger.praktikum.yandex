import template from './profile_edit.hbs'
import image from "../../images/profile.jpg"
import  "./profile_edit.css"
import arrow from "../../images/arrow.png";

const data = {
    first_name: "Иван",
    second_name: "Иванов",
    display_name: "IVA2",
    login: "IvanI",
    email: "@",
    phone: "123456",
    image: image,
    arrow: arrow
}

export default function profileeditPage()  {
    return template(data)
}
