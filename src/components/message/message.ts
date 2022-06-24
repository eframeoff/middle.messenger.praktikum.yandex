import Block from "../../utils/block/Block";
import { tpl } from "./tpl";

interface MessageProps {
  id: string;
  text: string;
}

export class Message extends Block {
  constructor(props : MessageProps) {
    super("div", props);
  }

  render() {
    return tpl(this.props);
  }
}
