import Handlebars from 'handlebars';

const source = `<div class="error500">
<h3>500</h3>
<p>Ошибка сервера</p>
</div>`;

export const tpl = Handlebars.compile(source);