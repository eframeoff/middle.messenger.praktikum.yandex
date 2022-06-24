import Block from "../../utils/block/Block";
import { tpl } from "./tpl";

interface LabelProps {
  classLabel: string;
  textLabel: string;
}

export class Label extends Block {
  constructor(props: LabelProps) {
    super("div", props);
  }

  render() {
    return tpl(this.props);
  }
}
