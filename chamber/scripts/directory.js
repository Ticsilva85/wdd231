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

// ===== DISPLAY MEMBERS ===== //
function displayMembers(members) {
    members.forEach(members => {

        const card = document.createElement('article');

        card.classList.add('member.image');

        card.innerHTML = `
            <img src="./images/${members.image}"
                alt = "${members.name}"
                    loading= "lazy">
                    
                    <h2>${members.name}</h2>

                    <p>${members.address}</p>

                    <p>${members.phone}</p>

                    <p>${members.industry}</p>

                    <a href= "${members.website}" target = "_blank">
                        Visit Website
                    </a>

                `;

                directory.appendChild(card);
    });
}

// ===== START ===== //

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
