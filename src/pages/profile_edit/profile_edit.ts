import "./profile_edit.scss";
import { tpl } from "./tpl";
import Block from "../../utils/block/Block";
import { Input } from "../../components/inputs/input";
import { Label } from "../../components/labels/label";
import { Button } from "../../components/button/button";
import { validateFunc } from "../../utils/validate";
import LoginApi from "../../api/loginApi";
import { Router } from "../../utils/router/Router";
import ChatApi from "../../api/chatApi";

interface IProfileEditProps {
  image: string;
  passwordVisibleButton: HTMLElement;
  returnToProfileButton: HTMLElement;
  display_nameInput: any;
  emailLabel: HTMLElement;
  emailInput: any;
  loginLabel: HTMLElement;
  loginInput: any;
  first_nameLabel: HTMLElement;
  first_nameInput: any;
  second_nameLabel: HTMLElement;
  second_nameInput: any;
  phoneLabel: HTMLElement;
  phoneInput: any;
  oldpasswordLabel: HTMLElement;
  oldpasswordInput: any;
  newpasswordLabel: HTMLElement;
  newpasswordInput: any;
  profileeditButton: HTMLElement;
  changePassVisible: HTMLElement;
  savePassword: HTMLElement;
}
const router = new Router();

export class ProfileEditPage extends Block {
  constructor() {
    super("div", {
      passwordVisibleButton: new Button({
        id: "passwordVisibleButton",
        classButton: "passwordVisibleButton",
        typeButton: "button",
        textButton: "Поменять пароль",
      }),
      returnToProfileButton: new Button({
        id: "returnToProfileButton",
        classButton: "returnToProfileButton",
        typeButton: "button",
        textButton: "Назад",
      }),
      profileeditButton: new Button({
        id: "profileEdit",
        classButton: "profileEdit",
        typeButton: "button",
        textButton: "Сохранить данные",
      }),
      savePassword: new Button({
        id: "savePassword",
        classButton: "savePassword",
        typeButton: "button",
        textButton: "Сохранить пароль",
      }),
      emailLabel: new Label({
        classLabel: "profileLabel",
        textLabel: "Почта",
      }),
      loginLabel: new Label({
        classLabel: "profileLabel",
        textLabel: "Логин",
      }),
      first_nameLabel: new Label({
        classLabel: "profileLabel",
        textLabel: "Имя",
      }),
      second_nameLabel: new Label({
        classLabel: "profileLabel",
        textLabel: "Фамилия",
      }),
      phoneLabel: new Label({
        classLabel: "profileLabel",
        textLabel: "Телефон",
      }),
      oldpasswordLabel: new Label({
        classLabel: "profileLabel",
        textLabel: "Старый пароль",
      }),
      newpasswordLabel: new Label({
        classLabel: "profileLabel",
        textLabel: "Новый пароль",
      }),
      events: {
        click: (e: Event) => this.saveProfile(e),
        focusout: (e: Event) => this.check(e),
        focusin: (e: Event) => this.checkoff(e),
      },
    });
    this.props.changePassVisible = false;
  }

  componentDidMount() {
    LoginApi.getUser()
      .then((data: any) => {
        this.props.userData = JSON.parse(data.response);
      })
      .catch((data) => console.log(data));
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

  changeAvatar() {
    const userAvatarInput = <HTMLFormElement>(
      document.getElementById("userAvatarInput")
    );
    if (userAvatarInput.files!.length) {
      const userAvatarFormData = new FormData();
      userAvatarFormData.append("avatar", userAvatarInput.files[0]);
      for (const pair of userAvatarFormData.entries()) {
        console.log(pair[1]);
        console.log(pair[0] + pair[1]);
      }
      ChatApi.changeUserAvatar({
        data: userAvatarFormData,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then(() => {
          this.componentDidMount();
          setTimeout(this.successAvatar, 500);
        })
        .catch((data) => console.log(data.response));
    }
  }

  savePassword() {
    const oldPass = (
      document.querySelector('input[name="oldPassword"]') as HTMLInputElement
    )?.value;
    const newPass = (
      document.querySelector('input[name="newPassword"]') as HTMLInputElement
    )?.value;
    const data = {
      oldPassword: oldPass,
      newPassword: newPass,
    };
    ChatApi.savePassword(data)
      .then(() => {
        this.props.changePassVisible = !this.props.changePassVisible;
        this.successPassword();
      })
      .catch(() => this.failurePassword());
  }

  saveUserData(data: any) {
    ChatApi.saveUserData(data)
      .then(() => {
        this.setProps(this.props);
        this.componentDidMount();
        setTimeout(this.successUserData, 500);
      })
      .catch((data) => console.log(data));
  }

  successUserData() {
    (document.getElementById("someEvent")!.style.color = "green"),
      (document.getElementById("someEvent")!.innerHTML =
        "Данные успешно обновлены");
  }

  successAvatar() {
    (document.getElementById("someEventAvatar")!.style.color = "green"),
      (document.getElementById("someEventAvatar")!.innerHTML =
        "Аватар успешно обновлен");
  }

  successPassword() {
    (document.getElementById("someEvent")!.style.color = "green"),
      (document.getElementById("someEvent")!.innerHTML =
        "Пароль успешно обновлен");
  }

  failurePassword() {
    (document.getElementById("someEvent")!.style.color = "red"),
      (document.getElementById("someEvent")!.innerHTML =
        "Проверьте правильность ввода паролей");
  }

  saveProfile = (e: Event) => {
    switch (e.target) {
      case document.getElementById("passwordVisibleButton"):
        this.props.changePassVisible = !this.props.changePassVisible;
        break;
      case document.getElementById(this.props.returnToProfileButton.props.id):
        router.go("/profile");
        break;
      case document.getElementById("avatar"):
        this.changeAvatar();
        break;
      case document.getElementById("savePassword"):
        this.savePassword();
        break;
      case document.getElementById(this.props.profileeditButton.props.id): {
        const form: HTMLFormElement | null = document.querySelector(
          'form[name="formDat"]'
        );
        let valid = true;
        const data: { [key: string]: string } = {};
        const dataArray = Array.from(form!.elements) as HTMLInputElement[];
        dataArray.push(document.querySelector('input[name="display_name"]')!);
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

        if (form !== null) {
          const formData: FormData = new FormData(form);
          formData.append(
            "display_name",
            (<HTMLInputElement>(
              document.querySelector('input[name="display_name"]')
            )).value
          );
          console.log(Object.fromEntries(formData));
          if (valid) {
            this.saveUserData(Object.fromEntries(formData));
          }
        }
        break;
      }
    }
  };

  render() {
    const data: IProfileEditProps = {
      returnToProfileButton: this.props.returnToProfileButton.render(),
      image:
        `https://ya-praktikum.tech/api/v2/resources` +
        this.props.userData?.avatar,
      loginInput: new Input({
        classInput: "profileInput",
        typeInput: "text",
        nameInput: "login",
        idInput: "login",
        valueInput: this.props.userData?.login,
      }).render(),
      display_nameInput: new Input({
        classInput: "profileInput",
        typeInput: "text",
        nameInput: "display_name",
        idInput: "display_name",
        valueInput: this.props.userData?.display_name,
      }).render(),
      emailInput: new Input({
        classInput: "profileInput",
        typeInput: "email",
        nameInput: "email",
        idInput: "email",
        valueInput: this.props.userData?.email,
      }).render(),
      first_nameInput: new Input({
        classInput: "profileInput",
        typeInput: "text",
        nameInput: "first_name",
        idInput: "first_name",
        valueInput: this.props.userData?.first_name,
      }).render(),
      second_nameInput: new Input({
        classInput: "profileInput",
        typeInput: "text",
        nameInput: "second_name",
        idInput: "second_name",
        valueInput: this.props.userData?.second_name,
      }).render(),
      phoneInput: new Input({
        classInput: "profileInput",
        typeInput: "number",
        nameInput: "phone",
        idInput: "phone",
        valueInput: this.props.userData?.phone,
      }).render(),
      oldpasswordInput: new Input({
        classInput: "profileInput",
        typeInput: "password",
        nameInput: "oldPassword",
        idInput: "oldPass",
        valueInput: "",
      }).render(),
      newpasswordInput: new Input({
        classInput: "profileInput",
        typeInput: "password",
        nameInput: "newPassword",
        idInput: "newPass",
        valueInput: "",
      }).render(),
      passwordVisibleButton: this.props.passwordVisibleButton.render(),
      emailLabel: this.props.emailLabel.render(),
      loginLabel: this.props.loginLabel.render(),
      first_nameLabel: this.props.first_nameLabel.render(),
      second_nameLabel: this.props.second_nameLabel.render(),
      phoneLabel: this.props.phoneLabel.render(),
      oldpasswordLabel: this.props.oldpasswordLabel.render(),
      newpasswordLabel: this.props.newpasswordLabel.render(),
      profileeditButton: this.props.profileeditButton.render(),
      savePassword: this.props.savePassword.render(),
      changePassVisible: this.props.changePassVisible,
    };

    return tpl(data);
  }
}
