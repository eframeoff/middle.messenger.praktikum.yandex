// import template from "./button.hbs"
// import { compile } from "handlebars";
import Block from "../../utils/Block"
import { tpl } from './tpl';

export class Input extends Block {
    constructor(props: any) {
        super("div", props);
    }
    
    render() {
        return tpl(this.props)
    }
}