import Block from "../../utils/block/Block";
import { tpl } from "./tpl";

interface IButtonProps {
  id: string;
  classButton: string;
  typeButton: string;
  textButton: string;
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super("div", props);
  }

  render() {
    return tpl(this.props);
  }
}
