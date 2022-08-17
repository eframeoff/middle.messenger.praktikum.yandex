import "./404.scss";
import {tpl} from "./tpl";
import Block from "../../utils/block/Block";

export class Page404 extends Block {
  constructor() {
    super("div");
  }

  render()  {
    return tpl({});
  }
}
