// ===== HAMBURGER BUTTON ===== //

const navbutton = document.querySelector('#menu');
const navmenu = document.querySelector('#header-menu');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navmenu.classList.toggle('show');

    const isOpen = navbutton.classList.contains('show');

    navbutton.setAttribute('aria-expanded', isOpen);

    navbutton.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
});

// ===== CURRENT YEAR ===== //
const currentYear = new Date().getFullYear();

document.querySelector('#currentyear').textContent = currentYear;

// ===== LAST MODIFIED DATE ===== //
const lastModified = document.lastModified;

document.querySelector('#lastModified').textContent = `Last Modification: ${lastModified}`;