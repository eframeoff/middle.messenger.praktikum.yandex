import Handlebars from "handlebars";

const source = `
<div class="chat">
  <div class="chat__list">
    <div class="chat__list__buttons">{{{exitButton}}} {{{profileButton}}}</div>

    <div class="chat__list__search">
      {{{addChatButton}}}
      {{{findInput}}}
    </div>
    <div class="chat__list__users" id="test">{{{chatMU}}}</div>
  </div>

  <div class="chat__messages">
    <div class="chat__messages__menu">
      {{#if addSettingsVisible}}
      {{#unless addChatVisible}}
      <img class="chatAvatar" id="chatAvatar" src="{{chatAvatar}}" alt="" />
      <div class="chat__messages__name">Чат: {{chatName}}</div>
      {{{settingsChatButton}}}
      {{/unless}}
      {{/if}}
    </div>
    {{#if addChatVisible}}
    <div class="chat__messages__settings">
      {{{deleteChatButton}}} {{{addUserButton}}}
      <div class="chat__messages__users">
        Удалить пользователей: {{#each curChat.users}}
        <div class="users" id="{{{id}}}">
          <a>{{{login}}}</a>
          {{{../userButton}}}
        </div>
        {{/each}}
      </div>
    </div>
    {{/if}}
    <div class="chat__messages__dialog" id="chats">
      {{{Message}}}
    {{#if addSettingsVisible}}
    {{#unless addChatVisible}}
    <form class="chat__messages__form" name="formDat">
        {{{sendMessageInput}}} {{{sendMessageButton}}}
        <div class="chat__messages__error" id="messageError"></div>
    </form>
    {{/unless}}
    {{/if}}
    </div>
  </div>
</div>

{{{chatModal}}} {{{userModal}}}

`;

export const tpl = Handlebars.compile(source);
