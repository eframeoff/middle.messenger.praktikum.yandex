const regExps = {
  login: /^[a-z0-9]{3,20}$/i,
  password: /(?=.*[0-9])(?=.*[A-Z])[0-9A-Za-z!@#$%^&*]{8,40}/,
  email: /^[0-9a-z\-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/i,
  name: /^([А-ЯЁ]{1}[а-яё]{1,29}|[A-Z]{1}[a-z]{1,29})$/,
  phone: /^(\+7|8)[0-9]{10,15}$/,
  message: /^[\s\S]{1,10}/,
};

const errorMessages = {
  login: "3-20 латинских символов",
  password: "8-40 латинских символов, одна заглавная и цифра",
  email: "проверьте правильность написания почты",
  name: "латиница или кириллица, первая буква заглавная",
  phone: "10-15 цифр, начинается с 7+/8",
  message: "поле не должно быть пустым",
};

interface Params {
  value: string;
  type: string;
  errorMsg: string;
}

export function validateFunc(params: Params) {
  let isValid: Boolean = false;
  const { value, type, errorMsg } = params;
  const error = document.getElementById(errorMsg);
  switch (type) {
    case "login":
      isValid = regExps.login.test(value);
      error!.innerText = isValid ? "" : errorMessages.login;
      break;
    case "password":
    case "repeat_password":
    case "oldPassword":
    case "newPassword":
      isValid = regExps.password.test(value);
      error!.innerText = isValid ? "" : errorMessages.password;
      break;
    case "email":
      isValid = regExps.email.test(value);
      error!.innerText = isValid ? "" : errorMessages.email;
      break;
    case "first_name":
    case "second_name":
    case "display_name":
      isValid = regExps.name.test(value);
      error!.innerText = isValid ? "" : errorMessages.name;
      break;
    case "phone":
      isValid = regExps.phone.test(value);
      error!.innerText = isValid ? "" : errorMessages.phone;
      break;
    case "message":
      isValid = regExps.message.test(value);
      error!.innerText = isValid ? "" : errorMessages.message;
      break;
    default:
      isValid = false;
  }

  return isValid;
}
