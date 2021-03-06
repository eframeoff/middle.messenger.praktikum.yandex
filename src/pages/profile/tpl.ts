import Handlebars from 'handlebars';

const source = `<div class="container">
<button
  class="returnToChat"
  type="button"
>
  <img src="{{arrow}}" alt="Назад" />
</button>
<div class="profile">
  <div class="profile__main">
    <a href="{{image}}" class="profile__main__logo">
      <img src="{{image}}" alt="Photo profile" />
    </a>
    <p>{{display_name}}</p>
    {{{profileButton}}}
  </div>
  <div class="profile__information">
    <ul>
      <li>{{first_name}}</li>
      <li>{{second_name}}</li>
      <li>{{login}}</li>
      <li>{{email}}</li>
      <li>{{phone}}</li>
    </ul>
  </div>
</div>
</div>`
;

export const tpl = Handlebars.compile(source);