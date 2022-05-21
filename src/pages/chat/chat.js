import template from "./chat.hbs";

export default function chatPage() {
  return template();
}

document.getElementById("root").innerHTML = chatPage();
