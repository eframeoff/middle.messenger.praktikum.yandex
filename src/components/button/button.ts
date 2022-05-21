// import template from "./button.hbs"
// import { compile } from "handlebars";
import Block from "../../utils/Block"
import { tpl } from './tpl';

interface ButtonProps {
    id: string,
    classButton: string,
    typeButton: string,
    textButton: string,
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super("div", props);
    }
    
    render() {
        return tpl(this.props)
    }
}