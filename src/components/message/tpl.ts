import Handlebars from "handlebars";

const source = `
<div class="message {{#if outerMessage}} message_outer{{/if}}" id="{{id}}">
<span class="text text_break-word">{{text}} </span>
<div class="time">
  <span>{{time}}</span>
</div>
</div>
`;

export const tpl = Handlebars.compile(source);
