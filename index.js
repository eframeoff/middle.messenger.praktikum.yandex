// РАБОТАЕТ

// import templateFunction from './src/pages/signin.hbs'

// const id = 3;
// var source = document.getElementById("root");
// source.innerHTML = templateFunction();
// const template = Handlebars.compile("Name: {{name}}");
// console.log(template({ name: "Nils" }));

// import templateFunction from './src/pages/signin.js'

// const id = 3;
// var source = document.getElementById("root");
// source.innerHTML = templateFunction();
// const template = Handlebars.compile("Name: {{name}}");
// console.log(template({ name: "Nils" }));





// import Handlebars from 'handlebars';
// // import tpl from 'bundle-text:./index.hbs';
// import signin from './src/pages/signin';

// document.getElementById('root').innerHTML = Handlebars.compile(tpl)({
//     fname: 'Vova'
// })

// var source = document.getElementById("entry-template").innerHTML;
// var template = Handlebars.compile(source); 

// var context = { title: "My New Post", body: "This is my first post!" };
// var html = template(context);

// {/* <script id="entry-template" type="text/x-handlebars-template">
//   <div class="entry">
//     <h1>{{title}}</h1>
//     <div class="body">
//       {{body}}
//     </div>
//   </div>
// </script> */}

// import {signinPageDo} from './src/pages/signin'


// import tmpl from './src/pages/signin.hbs';
// document.body.innerHTML = tmpl();



import signinPage from './src/pages/signin/signin.js';
import signupPage from './src/pages/signup/signup.js';
import chatPage from './src/pages/chat/chat.js';
import profilePage from './src/pages/profile/profile.js';
import profileeditPage from './src/pages/profile_edit/profile_edit.js';
import error404Page from './src/pages/404/404.js';
import error500Page from './src/pages/500/500.js';

const root = document.getElementById('root');


function findPage() {
if (window.location.href == 'http://localhost:1234')
root.innerHTML = signinPage()
else if (window.location.href == 'http://localhost:1234/signin')
root.innerHTML = signinPage()
else if (window.location.href == 'http://localhost:1234/signup')
root.innerHTML = signupPage()
else if (window.location.href == 'http://localhost:1234/chat')
root.innerHTML = chatPage()
else if (window.location.href == 'http://localhost:1234/profile')
root.innerHTML = profilePage()
else if (window.location.href == 'http://localhost:1234/profile_edit')
root.innerHTML = profileeditPage()
else if (window.location.href == 'http://localhost:1234/404')
root.innerHTML = error404Page()
else if (window.location.href == 'http://localhost:1234/500')
root.innerHTML = error500Page()
else root.innerHTML = error404Page()
}

findPage();