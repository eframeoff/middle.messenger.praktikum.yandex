import template from './signin.hbs'

// const id = 3;
// var source = document.getElementById("root");
// source.innerHTML = templateFunction();

const data = {
    loginField: "Логин",
    passwordField: "Пароль"
}


export default function signinPage()  {
    return template({data})
}



























// const fields = {
//     login: {
//         name: 'login',
//         placeholder: 'Login'
//     },
//     password: {
//         name: 'password',
//         placeholder: 'Password'
//     },
//     button: {
//         name: 'Sign in',
//     }
// }

// const a = {
//     loginField: 'login'
// }



// // var a = { "labelfield": "Alan"}

// var template2 = Handlebars.compile(hbs);
// export default template2(a);





// import tmpl from './signin.hbs';
// console.log(tmpl)

// export const signinPageDo = () =>  {
//     return tmpl
// }
