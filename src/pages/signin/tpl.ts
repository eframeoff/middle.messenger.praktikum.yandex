import Handlebars from 'handlebars';

const source = `
<div class="container">
<div class="signin">
 <p class="signin__title">Авторизация</p>
 <form action="/login" name="formDat">
     <div class="signin__group">
          {{{ loginLabel }}}             
          {{{ loginInput }}} 
          <div class='signin__group__error' id='loginError'></div>
        
     </div> 
     <div class="signin__group">
            {{{ passwordLabel }}}             
            {{{ passwordInput }}} 
            <div class='signin__group__error' id='passwordError'></div>
            <div class='signin__group__error' id='authError'></div>

     </div> 
     </form>
     <span> </span>
     <div class="signin__button">
         {{{ signinBtn }}}
         {{{ signupBtn }}}
     </div>
     </div>
 </div>
 </div>
`;

export const tpl = Handlebars.compile(source);