import template from "./500.hbs";
import "./500.css";

function error500Page() {
  return template();
}

document.getElementById("root").innerHTML = error500Page();
