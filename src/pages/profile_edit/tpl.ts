import Handlebars from 'handlebars';

const source = `<div class="container">
<button
  class="returnToProfile"
  type="button"
>
  <img src="{{arrow}}" alt="Назад" />
</button>
<div class="profile_edit">
  <div class="profile_edit__main">
    <a href="{{image}}" class="profile_edit__main__logo">
      <img src="{{image}}" alt="Photo profile" name="avatar" />
    </a>
    {{{display_nameInput}}}
    <div class="profile__error__display" id="display_nameError"></div>
    {{{profileeditButton}}}
  </div>
  <div class="profile_edit__information">
    <form action="/saveprofile" name="formDat">
      <ul>
        <li>
          {{{first_nameLabel}}} 
          {{{first_nameInput}}}
          <div class="profile__error" id="first_nameError"></div>
        </li>
        <li>
          {{{second_nameLabel}}} 
          {{{second_nameInput}}}
          <div class="profile__error" id="second_nameError"></div>
        </li>
        <li>
          {{{loginLabel}}} 
          {{{loginInput}}}
          <div class="profile__error" id="loginError"></div>
        </li>
        <li>
          {{{emailLabel}}} 
          {{{emailInput}}}
          <div class="profile__error" id="emailError"></div>
        </li>
        <li>
          {{{phoneLabel}}} 
          {{{phoneInput}}}
          <div class="profile__error" id="phoneError"></div>
        </li>
        <li>
          {{{oldpasswordLabel}}} 
          {{{oldpasswordInput}}}
          <div class="profile__error" id="oldPasswordError"></div>
        </li>
        <li>
          {{{newpasswordLabel}}} 
          {{{newpasswordInput}}}
          <div class="profile__error" id="newPasswordError"></div>
        </li>
      </ul>
    </form>
  </div>
</div>
</div>
`;

export const tpl = Handlebars.compile(source);