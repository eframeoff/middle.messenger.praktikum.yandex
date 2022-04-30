import Handlebars from "handlebars"
import button from 'bundle-text:./button.hbs'

Handlebars.registerPartial('button', button)

export default (id, value) => {
    return Handlebars.compile(button)({id, value});
}