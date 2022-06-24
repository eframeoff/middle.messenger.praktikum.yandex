import {SignInPage} from "./src/pages/signin/signin";
import {SignUpPage} from "./src/pages/signup/signup";
import {ChatPage} from "./src/pages/chat/chat";
import {Page404} from "./src/pages/404/404";
import {Page500} from "./src/pages/500/500";
import {ProfilePage} from "./src/pages/profile/profile";
import {ProfileEditPage} from "./src/pages/profile_edit/profile_edit";
import { Router } from "./src/utils/router/Router";
const router = new Router();

router
  .use("/", SignInPage)
  .use("/sign-up", SignUpPage)
  .use("/messenger", ChatPage)
  .use("/404", Page404)
  .use("/500", Page500)
  .use("/profile", ProfilePage)
  .use("/settings", ProfileEditPage)
  .start();
