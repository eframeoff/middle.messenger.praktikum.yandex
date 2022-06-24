import Handlebars from 'handlebars';

const source = `<div class="error404">
<h3 class="errorNumber">404</h3>
<p class="errorMessage">Страница не найдена</p>
</div>`;

export const tpl = Handlebars.compile(source);