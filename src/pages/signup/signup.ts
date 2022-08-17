import "./signup.scss";
import { tpl } from "./tpl";
import Block from "../../utils/block/Block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/inputs/input";
import { Label } from "../../components/labels/label";
import { validateFunc } from "../../utils/validate";
import { Router } from "../../utils/router/Router";
import RegistrApi from "../../api/registrApi";

const router = new Router();

interface DataProps {
  loginField: string;
  passwordField: string;
  emailLabel: HTMLElement;
  emailInput: HTMLElement;
  loginLabel: HTMLElement;
  loginInput: HTMLElement;
  first_nameLabel: HTMLElement;
  first_nameInput: HTMLElement;
  second_nameLabel: HTMLElement;
  second_nameInput: HTMLElement;
  phoneLabel: HTMLElement;
  phoneInput: HTMLElement;
  passwordLabel: HTMLElement;
  passwordInput: HTMLElement;
  repeat_passwordLabel: HTMLElement;
  repeat_passwordInput: HTMLElement;
  signupButtonIn: HTMLElement;
  signupButtonChat: HTMLElement;
}

export class SignUpPage extends Block {
  constructor() {
    super("div", {
      emailLabel: new Label({
        classLabel: "signupLabel",
        textLabel: "Почта",
      }),
      loginLabel: new Label({
        classLabel: "signupLabel",
        textLabel: "Логин",
      }),
      first_nameLabel: new Label({
        classLabel: "signupLabel",
        textLabel: "Имя",
      }),
      second_nameLabel: new Label({
        classLabel: "signupLabel",
        textLabel: "Фамилия",
      }),
      phoneLabel: new Label({
        classLabel: "signupLabel",
        textLabel: "Телефон",
      }),
      passwordLabel: new Label({
        classLabel: "signupLabel",
        textLabel: "Пароль",
      }),
      repeat_passwordLabel: new Label({
        classLabel: "signupLabel",
        textLabel: "Повторите пароль",
      }),
      emailInput: new Input({
        classInput: "signupInput",
        typeInput: "email",
        nameInput: "email",
        idInput: "email",
        valueInput: "",
      }),
      loginInput: new Input({
        classInput: "signupInput",
        typeInput: "text",
        nameInput: "login",
        idInput: "login",
        valueInput: "",
      }),
      first_nameInput: new Input({
        classInput: "signupInput",
        typeInput: "text",
        nameInput: "first_name",
        idInput: "first_name",
        valueInput: "",
      }),
      second_nameInput: new Input({
        classInput: "signupInput",
        typeInput: "text",
        nameInput: "second_name",
        idInput: "second_name",
        valueInput: "",
      }),
      phoneInput: new Input({
        classInput: "signupInput",
        typeInput: "number",
        nameInput: "phone",
        idInput: "phone",
        valueInput: "",
      }),
      passwordInput: new Input({
        classInput: "signupInput",
        typeInput: "password",
        nameInput: "password",
        idInput: "password",
        valueInput: "",
      }),
      repeat_passwordInput: new Input({
        classInput: "signupInput",
        typeInput: "password",
        nameInput: "repeat_password",
        idInput: "repeat_password",
        valueInput: "",
      }),
      signupButtonIn: new Button({
        id: "back",
        classButton: "signupButtonBlue",
        typeButton: "button",
        textButton: "Назад",
      }),
      signupButtonChat: new Button({
        id: "gochat",
        classButton: "signupButtonWhite",
        typeButton: "button",
        textButton: "Зарегистрироваться",
      }),
      events: {
        click: (e: Event) => this.signUp(e),
        focusout: (e: Event) => this.check(e),
        focusin: (e: Event) => this.checkoff(e),
      },
    });
  }

  check = (e: Event) => {
    const eTarget = <HTMLInputElement>e.target;
    if (eTarget.nodeName === "INPUT") {
      validateFunc({
        value: eTarget.value,
        type: eTarget.name,
        errorMsg: `${eTarget.name}Error`,
      });
    }
  };

  checkoff = (e: Event) => {
    const eTarget = <HTMLInputElement>e.target;
    document.getElementById(`${eTarget.name}Error`)!.innerHTML = "";
  };

  componentDidMount() {
    RegistrApi.getUser()
      .then(() => {
        router.go("/messenger");
      })
      .catch((data) => console.log(data));
  }

  signUp = (e: Event) => {
    switch (e.target) {
      case document.getElementById(this.props.signupButtonIn.props.id):
        router.go("/");
        break;
      case document.getElementById(this.props.signupButtonChat.props.id): {
        let valid = true;
        const form: HTMLFormElement | null = document.querySelector(
          'form[name="formDat"]'
        )!;
        const data: { [key: string]: string } = {};
        const dataArray = Array.from(form!.elements) as HTMLInputElement[];
        dataArray.forEach((element) => {
          valid = validateFunc({
            value: element.value,
            type: element.name,
            errorMsg: `${element.name}Error`,
          })
            ? valid
            : false;
          data[element.id] = element.value;
        });
        if (data.password !== data.repeat_password) {
          valid = false;
          alert("Пароли не совпадают");
        }
        if (form !== null) {
          const formData: FormData = new FormData(form);
          if (valid) {
            RegistrApi.signUp(Object.fromEntries(formData))
              .then(() => {
                router.go("/messenger");
              })
              .catch((data) => {
                console.log(data)});
          }
        }
        break;
      }
    }
  };

  render() {
    const data: DataProps = {
      loginField: "Логин",
      passwordField: "Пароль",
      emailLabel: this.props.emailLabel.render(),
      emailInput: this.props.emailInput.render(),
      loginLabel: this.props.loginLabel.render(),
      loginInput: this.props.loginInput.render(),
      first_nameLabel: this.props.first_nameLabel.render(),
      first_nameInput: this.props.first_nameInput.render(),
      second_nameLabel: this.props.second_nameLabel.render(),
      second_nameInput: this.props.second_nameInput.render(),
      phoneLabel: this.props.phoneLabel.render(),
      phoneInput: this.props.phoneInput.render(),
      passwordLabel: this.props.passwordLabel.render(),
      passwordInput: this.props.passwordInput.render(),
      repeat_passwordLabel: this.props.repeat_passwordLabel.render(),
      repeat_passwordInput: this.props.repeat_passwordInput.render(),
      signupButtonIn: this.props.signupButtonIn.render(),
      signupButtonChat: this.props.signupButtonChat.render(),
    };

    return tpl(data);
  }
}
