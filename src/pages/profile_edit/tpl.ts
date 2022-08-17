import Handlebars from 'handlebars';

const source = `
<div class="container">
{{{returnToProfileButton}}}
<div class="profile_edit">
  <div class="profile_edit__main">
    <a href="{{image}}" class="profile_edit__main__logo">
      <img id="avatarEditProfile" class="avatarEditProfile" src="{{image}}" alt="Photo profile" name="avatar" />
    </a>
    <form
      class="user__changeAvatar"
      id="userAvatarForm"
      enctype="multipart/form-data"
    >
      <input type="file" id="userAvatarInput" class="user__changeAvatar-input"
      name="userAvatarInput" accept='image/*'">
    </form>
    <button id="avatar" class="avatarChange">Сохранить аватар</button>
    {{{display_nameInput}}}
    <div class="profile__error__display" id="display_nameError"></div>
    <div class="someEventAvatar" id="someEventAvatar"></div>
  </div>
  <div class="profile_edit__information">
    <form action="/saveprofile" name="formDat">
      <div class="profile__edit_list">
        <div class="profile__edit_list-item">
          {{{first_nameLabel}}} {{{first_nameInput}}}
          <div class="profile__error" id="first_nameError"></div>
        </div>
        <div class="profile__edit_list-item">
          {{{second_nameLabel}}} {{{second_nameInput}}}
          <div class="profile__error" id="second_nameError"></div>
        </div>
        <div class="profile__edit_list-item">
          {{{loginLabel}}} {{{loginInput}}}
          <div class="profile__error" id="loginError"></div>
        </div>
        <div class="profile__edit_list-item">
          {{{emailLabel}}} {{{emailInput}}}
          <div class="profile__error" id="emailError"></div>
        </div>
        <div class="profile__edit_list-item">
          {{{phoneLabel}}} {{{phoneInput}}}
          <div class="profile__error" id="phoneError"></div>
        </div>
      </div>
    </form>
    {{{profileeditButton}}} {{{passwordVisibleButton}}} {{#if
    changePassVisible}}
    <div profile__edit_list>
      <div class="profile__edit_list-item">
        {{{oldpasswordLabel}}} {{{oldpasswordInput}}}
        <div class="profile__error" id="oldPasswordError"></div>
      </div>
      <div class="profile__edit_list-item">
        {{{newpasswordLabel}}} {{{newpasswordInput}}}
        <div class="profile__error" id="newPasswordError"></div>
      </div>
      {{{savePassword}}} {{/if}}
      <div class="someEvent" id="someEvent"></div>
    </div>
  </div>
</div>
</div>
`;

export const tpl = Handlebars.compile(source);