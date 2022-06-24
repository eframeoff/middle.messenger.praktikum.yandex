import Handlebars from "handlebars";

const source = `
<div class="modal" id="{{idModal}}">
  <div class="modal__content">
  {{{deleteChatButton}}}
    <p class="h1 modal__title">{{textModal}}</p>
    <form id="modalForm" class="modal__form">
    <input id="{{idInput}}" class="{{classInput}}" type="{{typeInput}}">
    </form>
    <div class="modal__buttons"> 
    <button id={{idAdd}} type={{typeButton}} class="{{classButtonAdd}}">{{textButtonAdd}}</button>
    <button id={{idClose}} type={{typeButton}} class="{{classButtonClose}}">{{textButtonClose}}</button>
    </div>
    </div>
</div>`;

export const tpl = Handlebars.compile(source);
