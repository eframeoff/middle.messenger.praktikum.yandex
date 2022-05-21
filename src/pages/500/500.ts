import "./500.scss";
import {tpl} from "./tpl";
import Block from "../../utils/Block";

export default class page500 extends Block {
  constructor() {
    super("div");
  }

  render() {
    return tpl({});
  }
}
