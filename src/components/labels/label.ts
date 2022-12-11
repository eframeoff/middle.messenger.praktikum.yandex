import Block from "../../utils/block/Block";
import { tpl } from "./tpl";

interface ILabelProps {
  classLabel: string;
  textLabel: string;
}

export class Label extends Block {
  constructor(props: ILabelProps) {
    super("div", props);
  }

  render() {
    return tpl(this.props);
  }
}
