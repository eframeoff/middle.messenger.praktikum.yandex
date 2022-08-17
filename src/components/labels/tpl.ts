import Handlebars from "handlebars";

const source = `
<label class="{{classLabel}}">{{textLabel}}</label>
`;

export const tpl = Handlebars.compile(source);
