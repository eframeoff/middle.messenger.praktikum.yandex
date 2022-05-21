import Handlebars from "handlebars";

const source = `
<div class="chat">
  <div class="chat__list">
    <div class="chat__list__search">
      <button
        class="returnToSignin"
        type="button"
      >
        <img src="{{arrow}}" alt="Назад" />
      </button>
      <input
        placeholder="Поиск"
        type="text"
        name="search"
      />
    </div>
    <div class="chat__list__users">
      <div class="chat__list__users__unit">
        <div class="avatar">
          <img src="{{image}}" alt="" />
        </div>
        <div class="preview">
          <div class="preview__name">Имя пользователя</div>
          <div class="preview__lastmessage">
          Последнее сообщение
          </div>
        </div>
      </div>
      <div class="chat__list__users__unit">
        <div class="avatar">
          <img src="{{image}}" alt="" />
        </div>
        <div class="preview">
          <div class="preview__name">Имя пользователя</div>
          <div class="preview__lastmessage">
          Последнее сообщение
          </div>
        </div>
      </div>
      <div class="chat__list__users__unit">
        <div class="avatar">
          <img src="{{image}}" alt="" />
        </div>
        <div class="preview">
          <div class="preview__name">Имя пользователя</div>
          <div class="preview__lastmessage">
            Последнее сообщение
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="chat__messages">
    <div class="chat__messages__menu">
      <img src="{{image}}" alt="" />
      <div class="chat__messages__name">Название чата</div>
    </div>

    <div class="chat__messages__dialog">
      <div class="message">
        <span class="text text_break-word">Первое сообщение</span>
      </div>
      <div class="message">
        <span class="text text_break-word">Второе сообщение</span>
      </div>
      <div class="message">
        <span class="text text_break-word">Третье сообщение</span>
      </div>
      <form class="chat__messages__form" name="formDat">
        {{{sendMessageInput}}} 
        {{{sendMessageButton}}}
        <div class="chat__messages__error" id="messageError"></div>
      </form>
    </div>
  </div>
</div>
`;

export const tpl = Handlebars.compile(source);
