import Handlebars from 'handlebars';

const source = `<div class="error404">
<h3>404</h3>
<p>Страница не найдена</p>
</div>`;

export const tpl = Handlebars.compile(source);