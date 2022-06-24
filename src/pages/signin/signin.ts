import "./signin.scss";
import { tpl } from "./tpl";
import Block from "../../utils/Block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/inputs/input";
import { Label } from "../../components/labels/label";
import { validateFunc } from "../../utils/validate";

export default class signinPage extends Block {
  constructor() {
    super("div", {
      loginLabel: new Label({
        classLabel: "signin__group__label",
        textLabel: "Логин",
      }),
      passwordLabel: new Label({
        classLabel: "signin__group__label",
        textLabel: "Пароль",
      }),

      loginInput: new Input({
        classInput: "signin__group__input",
        typeInput: "text",
        nameInput: "login",
      }),

      passwordInput: new Input({
        classInput: "signin__group__input",
        typeInput: "password",
        nameInput: "password",
      }),

      signinButton: new Button({
        id: "login",
        classButton: "signin__button__blue",
        typeButton: "button",
        textButton: "Войти",
      }),

      signupButton: new Button({
        id: "regist",
        classButton: "signin__button__white",
        typeButton: "button",
        textButton: "Зарегистрироваться",
      }),
      events: {
        click: (e: Event) => this.signIn(e),
        focusout: (e: Event) => this.check(e),
        focusin: (e: Event) => this.checkoff(e),
      },
    });
  }
  checkoff = (e: Event) => {
    const eTarget = <HTMLInputElement>e.target;
    document.getElementById(`${eTarget.name}Error`).innerHTML = "";
  };
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
  signIn = (e: Event) => {
    if (
      e.target === document.getElementById(this.props.signupButton.props.id)
    ) {
      document.location = "./signup";
    }

    if (
      e.target === document.getElementById(this.props.signinButton.props.id)
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
      signinBtn: HTMLElement;
      signupBtn: HTMLElement;
      loginInput: HTMLElement;
      passwordInput: HTMLElement;
      loginLabel: HTMLElement;
      passwordLabel: HTMLElement;
    } = {
      loginField: "Логин",
      passwordField: "Пароль",
      signinBtn: this.props.signinButton.render(),
      signupBtn: this.props.signupButton.render(),
      loginInput: this.props.loginInput.render(),
      passwordInput: this.props.passwordInput.render(),
      loginLabel: this.props.loginLabel.render(),
      passwordLabel: this.props.passwordLabel.render(),
    };

    return tpl(data);
  }
}
