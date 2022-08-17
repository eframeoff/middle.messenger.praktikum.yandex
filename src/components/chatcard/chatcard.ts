import Block from "../../utils/block/Block";
import { tpl } from "./tpl";

interface ChatCardProps {
  id: string;
  chatAvatar: HTMLImageElement;
  nameUser: string;
  lastMessage: string;
}
export class ChatCard extends Block {
  constructor(props: ChatCardProps) {
    super("div", props);
  }

  render() {
    return tpl(this.props);
  }
}
