import Handlebars from "handlebars";

const source = `
<div class="chat__list__users__unit" id={{ id }}>
  <div class="avatar">
    <img class="avatarImg" src="{{chatAvatar}}" alt="" />
    <div class="preview">
      <div class="preview__name">{{ nameUser }}</div>
      <div class="preview__lastmessage">{{#if lastMessage}} {{ lastMessage }} {{/if}} </div>
  </div>
  </div>
</div>
`;

export const tpl = Handlebars.compile(source);
