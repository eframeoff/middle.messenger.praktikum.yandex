import Block from "../../utils/block/Block";
import { tpl } from "./tpl";

interface IChatCardProps {
  id: string;
  chatAvatar: HTMLImageElement;
  nameUser: string;
  lastMessage?: string;
}
export class ChatCard extends Block {
  constructor(props: IChatCardProps) {
    super("div", props);
  }

  render() {
    return tpl(this.props);
  }
}
