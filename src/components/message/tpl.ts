import Handlebars from "handlebars";

const source = `<div class="message" id="{{id}}">
<span class="text text_break-word">{{text}}</span>
</div>`;

export const tpl = Handlebars.compile(source);
