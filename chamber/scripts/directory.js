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

                    <p>${members.adress}</p>

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