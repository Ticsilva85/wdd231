// ===== HAMBURGER BUTTON ===== //

const navbutton = document.querySelector('#menu');
const navmenu = document.querySelector('.nav-menu');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navmenu.classList.toggle('show');

    const isOpen = navbutton.classList.contains('show');
    navbutton.setAttribute('Aria-expanded', isOpen);
})