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
    const response = await fetch('./data/members.json');
    const data = await response.json();

    displayMembers(data);
}

// ===== Display Members ===== //
function displayMembers(members) {

    members.forEach(member => {

        const card = document.createElement('article');

        card.classList.add('member-card');

        card.innerHTML = `
            <img src="./images/${member.image}"
                alt = "${member.name}"
                    loading= "lazy">
                    
                    <h2>${member.name}</h2>

                    <p>${member.address}</p>

                    <p>${member.phone}</p>

                    <p>${member.industry}</p>

                    <a href= "${member.website}" target = "_blank">
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
