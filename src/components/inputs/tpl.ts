import Handlebars from "handlebars";

const source = `
<input class="{{classInput}}" type="{{typeInput}}" name="{{nameInput}}" id="{{idInput}}" value="{{valueInput}}">
`;

export const tpl = Handlebars.compile(source);
