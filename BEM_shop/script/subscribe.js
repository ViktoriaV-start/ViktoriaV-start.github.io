'use strict';

function checkEmail(value){


    let mailArr = value.split('');

    const regexp = /^([!#$%&*-+{}|?/~\w]+(.?[\w]+)*@([\w-]{1,255}\.)[\w-]{2,4})?$/;
    if (regexp.test(value)) {
        document.querySelector('.communication__mail').classList.add('display-none');
        document.querySelector('.communication__btn').classList.add('display-none');
        document.querySelector('.communication__success').classList.remove('display-none');
    } else {
        document.querySelector('.communication__mail').value = '';
        document.querySelector('.communication__mail').placeholder = 'ENTER CORRECT EMAIL';
    }
}

document.querySelector('.communication__form').addEventListener('submit', e => {
    e.preventDefault();
    checkEmail(document.querySelector('.communication__mail').value);
});