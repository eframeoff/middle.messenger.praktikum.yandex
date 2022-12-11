import Handlebars from "handlebars";

const source = `
<div class="chat">
  <div class="chat__list">
    <div class="chat__list__buttons">{{{exitButton}}} {{{profileButton}}}</div>

    <div class="chat__list__search">{{{addChatButton}}} {{{findInput}}}</div>
    <div class="chat__list__users" id="test">
      {{#each chatMU}} {{{this}}} {{/each}}
    </div>
  </div>

  <div class="chat__messages">
    <div class="chat__messages__menu">
      {{#if addSettingsVisible}} {{#unless addChatVisible}}
      <img class="chatAvatar" id="chatAvatar" src="{{chatAvatar}}" alt="" />
      <div class="chat__messages__name">{{chatName}}</div>
      {{{settingsChatButton}}} {{/unless}} {{/if}}
    </div>
    {{#if addChatVisible}}
    <div class="chat__messages__settings">
      {{{deleteChatButton}}} {{{addUserButton}}}
      <div class="chat__messages__users">
        Удалить пользователей из чата: {{#each curChat.users}}
        <div class="users" id="{{{id}}}">
          <a>{{{login}}}</a>
          {{{../deleteUserButton}}}
        </div>
        {{/each}}
      </div>
    </div>
    {{/if}}
    <div class="chat__messages__dialog" id="chats">
      {{#unless addSettingsVisible}}
      <div class="noopenchat">Выберите чат, пожалуйста :)</div>
      {{/unless}} {{{Message}}} {{#if addSettingsVisible}} {{#unless
      addChatVisible}}
    </div>
    <form class="chat__messages__form" name="formDat">
      {{{sendMessageInput}}} {{{sendMessageButton}}}
      <div class="chat__messages__error" id="messageError"></div>
    </form>
    {{/unless}} {{/if}}
  </div>
</div>

{{{chatModal}}} {{{userModal}}}
`;

export const tpl = Handlebars.compile(source);
