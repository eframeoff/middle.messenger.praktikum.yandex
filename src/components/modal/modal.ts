import Block from "../../utils/block/Block";
import { tpl } from "./tpl";
import "./modal.scss";

interface IModalProps {
  idModal: string;
  textModal: string;
  idInput: string;
  classInput: string;
  typeInput: string;
  idAdd: string;
  typeButton: string;
  classButtonAdd: string;
  textButtonAdd: string;
  idClose: string;
  classButtonClose: string;
  textButtonClose: string;
  modalError: string;
}

export class Modal extends Block {
  constructor(props: IModalProps) {
    super("div", props);
  }

  render() {
    return tpl(this.props);
  }
}
