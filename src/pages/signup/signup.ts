import "./signup.scss";
import { tpl } from "./tpl";
import Block from "../../utils/Block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/inputs/input";
import { Label } from "../../components/labels/label";
import { validateFunc } from "../../utils/validate";

export default class signupPage extends Block {
  constructor() {
    super("div", {
      emailLabel: new Label({
        classLabel: "signup__group__label",
        textLabel: "Почта",
      }),
      loginLabel: new Label({
        classLabel: "signup__group__label",
        textLabel: "Логин",
      }),
      first_nameLabel: new Label({
        classLabel: "signup__group__label",
        textLabel: "Имя",
      }),
      second_nameLabel: new Label({
        classLabel: "signup__group__label",
        textLabel: "Фамилия",
      }),
      phoneLabel: new Label({
        classLabel: "signup__group__label",
        textLabel: "Телефон",
      }),
      passwordLabel: new Label({
        classLabel: "signup__group__label",
        textLabel: "Пароль",
      }),
      repeat_passwordLabel: new Label({
        classLabel: "signup__group__label",
        textLabel: "Повторите пароль",
      }),

      emailInput: new Input({
        classInput: "signin__group__input",
        typeInput: "email",
        nameInput: "email",
      }),
      loginInput: new Input({
        classInput: "signin__group__input",
        typeInput: "text",
        nameInput: "login",
      }),
      first_nameInput: new Input({
        classInput: "signin__group__input",
        typeInput: "text",
        nameInput: "first_name",
      }),
      second_nameInput: new Input({
        classInput: "signin__group__input",
        typeInput: "text",
        nameInput: "second_name",
      }),
      phoneInput: new Input({
        classInput: "signin__group__input",
        typeInput: "number",
        nameInput: "phone",
      }),
      passwordInput: new Input({
        classInput: "signin__group__input",
        typeInput: "password",
        nameInput: "password",
      }),
      repeat_passwordInput: new Input({
        classInput: "signin__group__input",
        typeInput: "password",
        nameInput: "repeat_password",
      }),

      signupButtonIn: new Button({
        id: "back",
        classButton: "signup__button__blue",
        typeButton: "button",
        textButton: "Назад",
      }),

      signupButtonChat: new Button({
        id: "gochat",
        classButton: "signup__button__white",
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
    document.getElementById(`${eTarget.name}Error`).innerHTML = "";
  };
  signUp = (e: Event) => {
    if (
      e.target === document.getElementById(this.props.signupButtonIn.props.id)
    ) {
      document.location = "./";
    }
    if (
      e.target === document.getElementById(this.props.signupButtonChat.props.id)
    ) {
      const form: HTMLFormElement = document.querySelector(
        'form[name="formDat"]'
      );

      const data: { [key: string]: string } = {};
      const dataArray = Array.from(form!.elements) as HTMLInputElement[];
      dataArray.forEach((element) => {
        validateFunc({
          value: element.value,
          type: element.name,
          errorMsg: `${element.name}Error`,
        });
        data[element.id] = element.value;
      });

      if (form !== null) {
        const formData: FormData = new FormData(form);
        console.log(Object.fromEntries(formData));
      }
    }
  };

  render() {
    const data: {
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
    } = {
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
