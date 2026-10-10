// DISCOVER.HTML //
import { places } from "../data/places.mjs";

displayPlaces(places);

function displayPlaces(places) {
    const container = document.querySelector("#discover-grid");

    container.innerHTML = "<h2>Places of Interest</h2>";

    places.forEach((place) => {

        // Create the card
        const card = document.createElement("article");
        card.classList.add("discover-card");

        // Create the title
        const title = document.createElement("h3");
        title.textContent = place.name;

        // Create the image
        const image = document.createElement("img");
        image.src = place.image;
        image.alt = `View of ${place.name}`;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;

        // Create the address
        const address = document.createElement("p");
        address.classList.add("place-address");
        address.textContent = place.address;

        // Create the description
        const description = document.createElement("p");
        description.classList.add("place-description");
        description.textContent = place.description;

        // Create the Learn More button
        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.classList.add("learn-more-btn");
        button.type = "button";

        // Add elements to the card
        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        // Add card to the container
        container.appendChild(card);
    });
}