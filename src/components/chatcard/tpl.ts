import Handlebars from "handlebars";

const source = `
<div class="chat__list__users__unit" id={{ id }}>
  <div class="avatar">
    <img class="avatarImg" src="{{avatar}}" alt="" />
  </div>
  <div class="preview">
    <div class="preview__name">{{ nameUser }}</div>
    <div class="preview__lastmessage">{{ lastMessage }}</div>
  </div>
</div>
`;

export const tpl = Handlebars.compile(source);
