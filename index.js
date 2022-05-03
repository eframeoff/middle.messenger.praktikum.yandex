import signinPage from "./src/pages/signin/signin.js";
import signupPage from "./src/pages/signup/signup.js";
import chatPage from "./src/pages/chat/chat.js";
import profilePage from "./src/pages/profile/profile.js";
import profileeditPage from "./src/pages/profile_edit/profile_edit.js";
import error404Page from "./src/pages/404/404.js";
import error500Page from "./src/pages/500/500.js";

const root = document.getElementById("root");

function findPage() {
  if (window.location.pathname == "/") root.innerHTML = signinPage();
  else if (window.location.pathname == "/signin") root.innerHTML = signinPage();
  else if (window.location.pathname == "/signup") root.innerHTML = signupPage();
  else if (window.location.pathname == "/chat") root.innerHTML = chatPage();
  else if (window.location.pathname == "/profile")
    root.innerHTML = profilePage();
  else if (window.location.pathname == "/profile_edit")
    root.innerHTML = profileeditPage();
  else if (window.location.pathname == "/404") root.innerHTML = error404Page();
  else if (window.location.href == "/500") root.innerHTML = error500Page();
}

findPage();
