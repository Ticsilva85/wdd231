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

if (directory) {
    getMembers();
}

// ===== BUTTON TO GRID OR LIST ===== //

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#directory");

if (gridbutton && listbutton && display) {
    gridbutton.addEventListener("click", () => {
        display.classList.add("grid");
        display.classList.remove("list");
    });

    listbutton.addEventListener("click", () => {
        display.classList.add("list");
        display.classList.remove("grid");
    });
}

// ===== CURRENT YEAR ===== //
const currentYear = new Date().getFullYear();

document.querySelector('#currentyear').textContent = currentYear;

// ===== LAST MODIFIED DATE ===== //
const lastModified = document.lastModified;

document.querySelector('#lastModified').textContent = `Last Modification: ${lastModified}`;

// ===== PICTURE CAROUSEL JOIN PAGE ===== //
// ===== PICTURE CAROUSEL ===== //

const carouselTrack = document.querySelector(".carousel-track");
const carouselSlides = document.querySelectorAll(".carousel-track picture");

if (carouselTrack && carouselSlides.length > 0) {

    let currentSlide = 0;

    function nextSlide() {
        carouselSlides[currentSlide].style.opacity = "0";

        currentSlide++;

        if (currentSlide >= carouselSlides.length) {
            currentSlide = 0;
        }

        carouselSlides[currentSlide].style.opacity = "1";
    }

    setInterval(nextSlide, 4000);
}

// ===== WEATHER API ===== //

const weatherSection = document.querySelector(".weather");

if (weatherSection) {
    const apiKey = "fb0da35787f440c444ce340835a10ada";
    const city = "Recife,BR";

    const currentWeatherURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

    const forecastURL =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=en`;


    // ===== GET CURRENT WEATHER ===== //

    async function getWeather() {
        try {
            const response = await fetch(currentWeatherURL);

            if (!response.ok) {
                throw new Error("Unable to fetch current weather data.");
            }

            const data = await response.json();

            displayWeather(data);

        } catch (error) {
            console.error(error);
        }
    }


    // ===== DISPLAY CURRENT WEATHER ===== //

    function displayWeather(data) {
        document.querySelector("#temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.querySelector("#weather-description").textContent =
            data.weather[0].description;

        document.querySelector("#high-temperature").textContent =
            `${Math.round(data.main.temp_max)}°C`;

        document.querySelector("#low-temperature").textContent =
            `${Math.round(data.main.temp_min)}°C`;

        document.querySelector("#humidity").textContent =
            `${data.main.humidity}%`;

        document.querySelector("#weather-icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.querySelector("#weather-icon").alt =
            data.weather[0].description;

        document.querySelector("#sunrise").textContent =
            formatTime(data.sys.sunrise);

        document.querySelector("#sunset").textContent =
            formatTime(data.sys.sunset);
    }


    // ===== GET 3-DAY FORECAST ===== //

    async function getForecast() {
        try {
            const response = await fetch(forecastURL);

            if (!response.ok) {
                throw new Error("Unable to fetch forecast data.");
            }

            const data = await response.json();

            displayForecast(data);

        } catch (error) {
            console.error(error);
        }
    }


    // ===== DISPLAY FORECAST ===== //

    function displayForecast(data) {
        const forecastContainer =
            document.querySelector("#forecast-container");

        forecastContainer.innerHTML = "";

        const dailyForecasts = {};

        data.list.forEach(forecast => {
            const date = forecast.dt_txt.split(" ")[0];

            if (!dailyForecasts[date]) {
                dailyForecasts[date] = forecast;
            }
        });

        const forecastDays = Object.values(dailyForecasts).slice(1, 4);

        forecastDays.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);

            const card = document.createElement("article");
            card.classList.add("forecast-card");

            card.innerHTML = `
                <h4>${formatDate(date)}</h4>

                <img
                    src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                    alt="${forecast.weather[0].description}"
                    width="70"
                    height="70"
                >

                <p class="forecast-temperature">
                    ${Math.round(forecast.main.temp)}°C
                </p>

                <p>
                    ${forecast.weather[0].description}
                </p>
            `;

            forecastContainer.appendChild(card);
        });
    }


    // ===== FORMAT DATE ===== //

    function formatDate(date) {
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric"
        });
    }


    // ===== FORMAT TIME ===== //

    function formatTime(timestamp) {
        const date = new Date(timestamp * 1000);

        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit"
        });
    }


    // ===== INITIALIZE WEATHER ===== //

    getWeather();
    getForecast();
}

// ===== COMPANY SPOTLIGHTS ===== //

const spotlightsContainer = document.querySelector("#spotlights-container");

if (spotlightsContainer) {

    async function getSpotlights() {
        try {
            const response = await fetch("./data/members.json");

            if (!response.ok) {
                throw new Error("Unable to load member data.");
            }

            const members = await response.json();

            displaySpotlights(members);

        } catch (error) {
            console.error(error);
            spotlightsContainer.innerHTML =
                "<p>Unable to load company spotlights.</p>";
        }
    }

    function displaySpotlights(members) {

        // Select Gold and Silver members
        const eligibleMembers = members.filter(
            member => member.membershipLevel === 2 || member.membershipLevel === 3
        );

        // Shuffle the eligible members
        eligibleMembers.sort(() => Math.random() - 0.5);

        // Select three companies
        const selectedMembers = eligibleMembers.slice(0, 3);

        selectedMembers.forEach(member => {

            const card = document.createElement("article");

            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img 
                    src="./images/${member.image}"
                    alt="${member.name}"
                    width="150"
                    height="100"
                    loading="lazy"
                >

                <div class="spotlight-content">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p>${member.industry}</p>

                    <a 
                        href="${member.website}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Website
                    </a>
                </div>
            `;

            spotlightsContainer.appendChild(card);
        });
    }

    getSpotlights();
}

// ===== JOIN PAGE ===== //
// ===== Time stamp information ===== //
const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toISOString();

// ===== Dialog cards ===== //
const membershipDialogs = [
    {
        link: document.querySelector("#open-np"),
        dialog: document.querySelector("#np-dialog")
    },
    {
        link: document.querySelector("#open-bronze"),
        dialog: document.querySelector("#bronze-dialog")
    },
    {
        link: document.querySelector("#open-silver"),
        dialog: document.querySelector("#silver-dialog")
    },
    {
        link: document.querySelector("#open-gold"),
        dialog: document.querySelector("#gold-dialog")
    }
];

membershipDialogs.forEach(({ link, dialog }) => {

    link.addEventListener("click", (event) => {
        event.preventDefault();
        dialog.showModal();
    });

    const closeButton = dialog.querySelector(".close-dialog");

    closeButton.addEventListener("click", () => {
        dialog.close();
    });

});