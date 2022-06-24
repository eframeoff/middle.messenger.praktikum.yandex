import "./500.scss";
import {tpl} from "./tpl";
import Block from "../../utils/block/Block";

export class Page500 extends Block {
  constructor() {
    super("div");
  }

  render() {
    return tpl({});
  }
}
