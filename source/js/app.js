/* window.addEventListener('DOMContentLoaded', function () {
}); */








(function () {
    const button = document.querySelector('.button-to-top_js');

    if (!button) return;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    })

    window.addEventListener('scroll', (e) => {
        if (window.pageYOffset > 1500) {
            button.classList.remove('button-to-top_hidden');
        } else {
            button.classList.add('button-to-top_hidden');
        }
    })
    
})()



    

