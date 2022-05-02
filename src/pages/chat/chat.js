import template from './chat.hbs'

function chatPage()  {
    return template()
}

document.getElementById('root').innerHTML = chatPage();