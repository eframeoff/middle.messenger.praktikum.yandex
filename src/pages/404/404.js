import template from './404.hbs'
import './404.css'

function error404Page()  {
    return template()
}

document.getElementById('root').innerHTML = error404Page();