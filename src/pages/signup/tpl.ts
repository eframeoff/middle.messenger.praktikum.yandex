import Handlebars from 'handlebars';

const source =`
<div class="container">
<div class="signup">
<p class="signup__title" >Регистрация</p>
<form action="/register" name="formDat">
    <div class="signup__group">
        {{{emailLabel}}}                
        {{{emailInput}}} 
        <div class='signup__group__error' id='emailError'></div>

    <div id="error"></div>
    </div>
    <div class="signup__group">
        {{{loginLabel}}}                
        {{{loginInput}}} 
        <div class='signup__group__error' id='loginError'></div>

    </div>
    <div class="signup__group">
        {{{first_nameLabel}}}                
        {{{first_nameInput}}} 
        <div class='signup__group__error' id='first_nameError'></div>

    </div>
    <div class="signup__group">
        {{{second_nameLabel}}}                
        {{{second_nameInput}}} 
        <div class='signup__group__error' id='second_nameError'></div>

    </div>
    <div class="signup__group">
        {{{phoneLabel}}}                
        {{{phoneInput}}} 
        <div class='signup__group__error' id='phoneError'></div>
    </div>
    <div class="signup__group">
        {{{passwordLabel}}}                
        {{{passwordInput}}} 
        <div class='signup__group__error' id='passwordError'></div>

    </div>
    <div class="signup__group">
        {{{repeat_passwordLabel}}}                
        {{{repeat_passwordInput}}} 
        <div class='signup__group__error' id='repeat_passwordError'></div>

    </div>
    </form>

    <div class="signup__button">
        {{{signupButtonIn}}}  
        {{{signupButtonChat}}}            
    </div>
</div>
</div>
`;

export const tpl = Handlebars.compile(source);