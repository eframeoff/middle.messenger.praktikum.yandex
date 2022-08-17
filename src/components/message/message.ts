import Block from "../../utils/block/Block";
import { tpl } from "./tpl";

interface IMessageProps {
  id: string;
  text: string;
  outerMessage: boolean;
  time: string;
}

export class Message extends Block {
  constructor(props : IMessageProps) {
    super("div", props);
  }

  render() {
    return tpl(this.props);
  }
}
