import Block from "../../utils/block/Block";
import { tpl } from "./tpl";

interface InputProps {
  idInput: string;
  classInput: string;
  typeInput: string;
  valueInput: string;
  nameInput: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super("div", props);
  }

  render() {
    return tpl(this.props);
  }
}
