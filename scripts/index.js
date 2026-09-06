// ===== HAMBURGER BUTTON ====== //

const navbutton = document.querySelector('#menu');
const navmenu = document.querySelector('.nav-menu');



navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navmenu.classList.toggle('show');
});

// ===== CURRENT YEAR ===== //
const currentYear = new Date().getFullYear();

document.querySelector('#currentyear').textContent = currentYear;


// ===== LAST MODIFIED DATE ===== //
const lastModified = document.lastModified;

document.querySelector('#lastModified').textContent = `Last Modification: ${lastModified}`;