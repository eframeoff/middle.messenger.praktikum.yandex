enum Type {
  Login = "login",
  Password = "password",
  Repeat_password = "repeat_password",
  Email = "email",
  First_name = "first_name",
  Second_name = "second_name",
  Display_name = "display_name",
  Phone = "phone",
  Message = "message",
}

const REG_EXPS = {
  login: /^[a-z0-9]{3,20}$/i,
  password: /(?=.*[0-9])(?=.*[A-Z])[0-9A-Za-z!@#$%^&*]{8,40}/,
  email: /^[0-9a-z\-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/i,
  name: /^([А-ЯЁ]{1}[а-яё]{1,29}|[A-Z]{1}[a-z]{1,29})$/,
  phone: /^(\+7|8)[0-9]{10,15}$/,
  message: /^[\s\S]{1,10}/,
};

const ERROR_MESSAGES = {
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
  console.log(params.value)
  switch (type) {
    case Type.Login:
      isValid = REG_EXPS.login.test(value);
      error!.innerText = isValid ? "" : ERROR_MESSAGES.login;
      break;
    case Type.Password:
    case Type.Repeat_password:
      isValid = REG_EXPS.password.test(value);
      error!.innerText = isValid ? "" : ERROR_MESSAGES.password;
      break;
    case Type.Email:
      isValid = REG_EXPS.email.test(value);
      error!.innerText = isValid ? "" : ERROR_MESSAGES.email;
      break;
    case Type.First_name:
    case Type.Second_name:
    case Type.Display_name:
      isValid = REG_EXPS.name.test(value);
      error!.innerText = isValid ? "" : ERROR_MESSAGES.name;
      break;
    case Type.Phone:
      isValid = REG_EXPS.phone.test(value);
      error!.innerText = isValid ? "" : ERROR_MESSAGES.phone;
      break;
    case Type.Message:
      isValid = REG_EXPS.message.test(value);
      error!.innerText = isValid ? "" : ERROR_MESSAGES.message;
      break;
    default:
      isValid = false;
  }
  console.log(isValid)
  return isValid;
}
