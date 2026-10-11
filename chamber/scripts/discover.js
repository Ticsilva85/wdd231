// ===== HAMBURGER BUTTON ===== //

const navbutton = document.querySelector('#menu');
const navmenu = document.querySelector('.nav-menu');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navmenu.classList.toggle('show');

    const isOpen = navbutton.classList.contains('show');
    navbutton.setAttribute('aria-expanded', isOpen);
})

// DISCOVER.HTML //
import { places } from "../data/places.mjs";

displayPlaces(places);

function displayPlaces(places) {
    const container = document.querySelector("#discover-grid");

    container.querySelectorAll(".discover-card").forEach(card => card.remove());

    places.forEach((place) => {

        // Create the card
        const card = document.createElement("article");
        card.classList.add("discover-card");

        // Create the title
        const title = document.createElement("h2");
        title.textContent = place.name;

        // Create the figure
        const figure = document.createElement("figure");

        // Create the image
        const image = document.createElement("img");
        image.src = place.image;
        image.alt = `View of ${place.name}`;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;

        // Add image to figure
        figure.appendChild(image);

        // Create information container
        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info");

        // Create the address
        const address = document.createElement("address");
        address.classList.add("place-address");
        address.textContent = place.address;

        // Create the description
        const description = document.createElement("p");
        description.classList.add("place-description");
        description.textContent = place.description;

        // Create Learn More button
        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.classList.add("learn-more-btn");
        button.type = "button";

        // Add information elements
        cardInfo.appendChild(address);
        cardInfo.appendChild(description);
        cardInfo.appendChild(button);

        // Build the card
        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(cardInfo);

        // Add card to container
        container.appendChild(card);

        container.classList.add("loaded");
    });

    // VISITOR MESSAGE USING LOCAL STORAGE

    function displayVisitorMessage() {

        const visitorMessage = document.querySelector("#visitor-message");

        // Get the current date in milliseconds
        const currentVisit = Date.now();

        // Get the previous visit from localStorage
        const lastVisit = localStorage.getItem("lastVisit");

        let message;

        if (lastVisit === null) {
            // First visit
            message = "Welcome! Let us know if you have any questions.";

        } else {
            // Calculate the difference between visits
            const timeDifference = currentVisit - Number(lastVisit);

            // Convert milliseconds into days
            const daysDifference = Math.floor(
                timeDifference / (1000 * 60 * 60 * 24)
            );

            if (daysDifference < 1) {
                message = "Back so soon! Awesome!";

            } else if (daysDifference === 1) {
                message = "You last visited 1 day ago.";

            } else {
                message = `You last visited ${daysDifference} days ago.`;
            }
        }

        // Display the message
        visitorMessage.textContent = message;

        // Save the current visit
        localStorage.setItem("lastVisit", currentVisit.toString());
    }

displayVisitorMessage();
}

// ===== CURRENT YEAR ===== //
const currentYear = new Date().getFullYear();

document.querySelector('#currentyear').textContent = currentYear;

// ===== LAST MODIFIED DATE ===== //
const lastModified = document.lastModified;

document.querySelector('#lastModified').textContent = `Last Modification: ${lastModified}`;