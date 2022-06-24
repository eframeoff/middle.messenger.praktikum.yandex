import Handlebars from "handlebars";

const source = `
<button onclick="{{onclick}}" id={{id}} type={{typeButton}} class="{{classButton}}">{{textButton}}</button>
`;

export const tpl = Handlebars.compile(source);
