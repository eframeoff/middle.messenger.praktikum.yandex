import Handlebars from "handlebars";

const source = `<div class="container">
{{{returnToChatButton}}}
<div class="profile">
  <div class="profile__main">
    <a href="{{avatar}}" class="profile__main__logo">
      <img id="avatarProfile" src="{{avatar}}" alt="Photo profile" />
    </a>
    <p class="displayName">{{userData.display_name}}</p>
    {{{profileButton}}}
  </div>
  <div class="profile__information">
    <ul class="profile__information_list">
      <li class="profile__information_list-item">{{userData.first_name}}</li>
      <li class="profile__information_list-item">{{userData.second_name}}</li>
      <li class="profile__information_list-item">{{userData.login}}</li>
      <li class="profile__information_list-item">{{userData.email}}</li>
      <li class="profile__information_list-item">{{userData.phone}}</li>
    </ul>
  </div>
</div>
</div>`;
export const tpl = Handlebars.compile(source);
