import "./profile_edit.scss";
import { tpl } from "./tpl";
import image from "../../images/profile.jpg";
import arrow from "../../images/arrow.png";
import Block from "../../utils/Block";
import { Input } from "../../components/inputs/input";
import { Label } from "../../components/labels/label";
import { Button } from "../../components/button/button";
import { validateFunc } from "../../utils/validate";

export default class profileeditPage extends Block {
  constructor() {
    super("div", {
      profileeditButton: new Button({
        id: "profile_edit",
        classButton: "profile_edit__button__blue",
        typeButton: "button",
        textButton: "Сохранить",
      }),

      emailLabel: new Label({
        classLabel: "profile_edit__group__label",
        textLabel: "Почта",
      }),
      loginLabel: new Label({
        classLabel: "profile_edit__group__label",
        textLabel: "Логин",
      }),
      first_nameLabel: new Label({
        classLabel: "profile_edit__group__label",
        textLabel: "Имя",
      }),
      second_nameLabel: new Label({
        classLabel: "profile_edit__group__label",
        textLabel: "Фамилия",
      }),
      phoneLabel: new Label({
        classLabel: "profile_edit__group__label",
        textLabel: "Телефон",
      }),
      oldpasswordLabel: new Label({
        classLabel: "profile_edit__group__label",
        textLabel: "Старый пароль",
      }),
      newpasswordLabel: new Label({
        classLabel: "profile_edit__group__label",
        textLabel: "Новый пароль",
      }),

      display_nameInput: new Input({
        classInput: "profile_edit__group__input",
        typeInput: "text",
        nameInput: "display_name",
      }),
      emailInput: new Input({
        classInput: "profile_edit__group__input",
        typeInput: "email",
        nameInput: "email",
      }),
      loginInput: new Input({
        classInput: "profile_edit__group__input",
        typeInput: "text",
        nameInput: "login",
      }),
      first_nameInput: new Input({
        classInput: "profile_edit__group__input",
        typeInput: "text",
        nameInput: "first_name",
      }),
      second_nameInput: new Input({
        classInput: "profile_edit__group__input",
        typeInput: "text",
        nameInput: "second_name",
      }),
      phoneInput: new Input({
        classInput: "profile_edit__group__input",
        typeInput: "number",
        nameInput: "phone",
      }),
      oldpasswordInput: new Input({
        classInput: "profile_edit__group__input",
        typeInput: "password",
        nameInput: "oldPassword",
      }),
      newpasswordInput: new Input({
        classInput: "profile_edit__group__input",
        typeInput: "password",
        nameInput: "newPassword",
      }),
      events: {
        click: (e: Event) => this.saveProfile(e),
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
  saveProfile = (e: Event) => {
    if (
      e.target ===
      document.getElementById(this.props.profileeditButton.props.id)
    ) {
      const form: HTMLFormElement | null = document.querySelector(
        'form[name="formDat"]'
      );
      const data: { [key: string]: string } = {};
      const dataArray = Array.from(form!.elements) as HTMLInputElement[];
      dataArray.push(document.querySelector('input[name="display_name"]'));
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
        formData.append(
          "display_name",
          (<HTMLInputElement>(
            document.querySelector('input[name="display_name"]')
          )).value
        );
        console.log(Object.fromEntries(formData));
      }
    }
  };
  render() {
    const data: {
      arrow: HTMLImageElement;
      image: HTMLImageElement;
      display_name: HTMLElement;
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
      oldpasswordLabel: HTMLElement;
      oldpasswordInput: HTMLElement;
      newpasswordLabel: HTMLElement;
      newpasswordInput: HTMLElement;
      profileeditButton: HTMLElement;
    } = {
      arrow: arrow,
      image: image,
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
      oldpasswordLabel: this.props.oldpasswordLabel.render(),
      oldpasswordInput: this.props.oldpasswordInput.render(),
      newpasswordLabel: this.props.newpasswordLabel.render(),
      newpasswordInput: this.props.newpasswordInput.render(),
      profileeditButton: this.props.profileeditButton.render(),
      display_nameInput: this.props.display_nameInput.render(),
    };

    return tpl(data);
  }
}
