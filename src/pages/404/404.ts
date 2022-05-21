import "./404.scss";
import {tpl} from "./tpl";
import Block from "../../utils/Block";

export default class page404 extends Block {
  constructor() {
    super("div");
  }

  render()  {
    return tpl({});
  }
}
