import Handlebars from 'handlebars';

const source = `
<div class="error500">
    <h3 class="errorNumber">500</h3>
    <p class="errorMessage">Ошибка сервера</p>
</div>`;

export const tpl = Handlebars.compile(source);