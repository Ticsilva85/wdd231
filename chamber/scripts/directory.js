// ===== HAMBURGER BUTTON ===== //

const navbutton = document.querySelector('#menu');
const navmenu = document.querySelector('.nav-menu');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navmenu.classList.toggle('show');

    const isOpen = navbutton.classList.contains('show');
    navbutton.setAttribute('Aria-expanded', isOpen);
})

// ===== LOAD MEMBER DATA ===== //

const directory = document.querySelector('#directory');

async function getMembers() {
    try {
        const response = await fetch('./data/members.json');

        if (!response.ok) {
            throw new Error('Unable to load member data.');
        }

        const data = await response.json();

        displayMembers(data);

    } catch (error) {
        directory.innerHTML = '<p>Unable to load the directory.</p>';
        console.error(error);
    }
}

// ===== Display Members ===== //
function displayMembers(members) {

    directory.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement('article');

        card.classList.add('member-card');

        card.innerHTML = `
            <img 
                src="./images/${member.image}"
                alt="${member.name}"
                width="150"
                height="100"
                loading="lazy"
            >

            <h2>${member.name}</h2>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>${member.industry}</p>

            <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                Visit Website
            </a>
        `;

        directory.appendChild(card);
    });
}

// ===== Start ===== //

getMembers();

// ===== BUTTON TO GRID OR LIST ===== //

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#directory");

gridbutton.addEventListener("click", () => {
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); 
function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}

// ===== CURRENT YEAR ===== //
const currentYear = new Date().getFullYear();

document.querySelector('#currentyear').textContent = currentYear;

// ===== LAST MODIFIED DATE ===== //
const lastModified = document.lastModified;

document.querySelector('#lastModified').textContent = `Last Modification: ${lastModified}`;

// ===== PICTURE CAROUSEL JOIN PAGE ===== //
const carouselTrack = document.querySelector(".carousel-track");
const carouselSlides = document.querySelector(".carousel-track picture");

let currentSlide = 0;

function nextSlide() {
    currentSlide++;

    if (currentSlide >= carouselSlides.length) {
        currentSlide = 0;
    }

    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

setInterval(nextSlide, 4000);