import Handlebars from 'handlebars';

const source = `
<input class="{{classInput}}" type="{{typeInput}}" name="{{nameInput}}">

`;

export const tpl = Handlebars.compile(source);