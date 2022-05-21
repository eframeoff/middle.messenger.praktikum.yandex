import signinPage from "./src/pages/signin/signin";
import signupPage from "./src/pages/signup/signup";
import chatPage from "./src/pages/chat/chat";
import page404 from "./src/pages/404/404";
import page500 from "./src/pages/500/500";
import profilePage from "./src/pages/profile/profile";
import profileeditPage from "./src/pages/profile_edit/profile_edit";

import { render } from "./src/utils/render";

function getComponent() {
  switch (window.location.pathname) {
    case "/":
    case "/signin":
      return new signinPage();
    case "/signup":
      return new signupPage();
    case "/chat":
      return new chatPage();
    case "/404":
      return new page404();
    case "/500":
      return new page500();
    case "/profile":
      return new profilePage();
    case "/profile_edit":
      return new profileeditPage();
  }
}

const component = getComponent();
document.addEventListener("DOMContentLoaded", () => {
  render("#root", component);
});
