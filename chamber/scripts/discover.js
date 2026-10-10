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
    });
}