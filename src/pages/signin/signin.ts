import "./signin.scss";
import { tpl } from "./tpl";
import Block from "../../utils/block/Block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/inputs/input";
import { Label } from "../../components/labels/label";
import { validateFunc } from "../../utils/validate";
import { Router } from "../../utils/router/Router";
import LoginApi from "../../api/loginApi";
const router = new Router();

interface DataProps {
    loginField: string;
    passwordField: string;
    signinBtn: HTMLElement;
    signupBtn: HTMLElement;
    loginInput: HTMLElement;
    passwordInput: HTMLElement;
    loginLabel: HTMLElement;
    passwordLabel: HTMLElement;
}

export class SignInPage extends Block {
  constructor() {
    super("div", {
      loginLabel: new Label({
        classLabel: "signinLabel",
        textLabel: "Логин",
      }),
      passwordLabel: new Label({
        classLabel: "signinLabel",
        textLabel: "Пароль",
      }),

      loginInput: new Input({
        classInput: "signinInput",
        typeInput: "text",
        nameInput: "login",
        idInput: "login",
        valueInput: "",
      }),

      passwordInput: new Input({
        classInput: "signinInput",
        typeInput: "password",
        nameInput: "password",
        idInput: "password",
        valueInput: "",
      }),

      signinButton: new Button({
        id: "signinButtonBlue",
        classButton: "signinButtonBlue",
        typeButton: "button",
        textButton: "Войти",
      }),

      signupButton: new Button({
        id: "signinButtonWhite",
        classButton: "signinButtonWhite",
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
    document.getElementById(`${eTarget.name}Error`)!.innerHTML = "";
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

  componentDidMount() {
    LoginApi.getUser()
      .then(() => {
        router.go("/messenger");
      })
      .catch((data) => console.log(JSON.parse(data.response)));
  }

  signIn = (e: Event) => {
    switch (e.target) {
      case document.getElementById(this.props.signupButton.props.id):
        router.go("/sign-up");
        break;
      case document.getElementById(this.props.signinButton.props.id): {
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
          });
          data[element.id] = element.value;
        });
        if (form !== null) {
          const formData: FormData = new FormData(form);
          if (valid) {
            const data = Object.fromEntries(formData);
            LoginApi.signIn(data)
              .then(() => router.go("/messenger"))
              .catch((data) => console.log(JSON.parse(data.response)));
          }
        }
        break;
      }
    }
  };

  render() {
    const data : DataProps = {
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
