
/* ================== ACTIVITIES.JS ================== */

/* ===== FAVORITES MODULE ===== */
import {
    getFavorites,
    isFavorite,
    toggleFavorite
} from "./favorites.js";

/* ===== DOM ELEMENTS ===== */
const searchInput = document.querySelector("#activity-search");
const levelFilter = document.querySelector("#level-filter");
const skillFilter = document.querySelector("#skill-filter");
const durationFilter = document.querySelector("#duration-filter");

const searchButton = document.querySelector("#search-activities");
const clearButton = document.querySelector("#clear-filter");
const loadMoreButton = document.querySelector("#load-more");

const activitiesContainer = document.querySelector("#activities-container");
const resultsCount = document.querySelector("#results-count");

/* ===== FAVORITES FILTER ===== */
const favoritesOnly = document.querySelector("#favorites-only");

/* ===== DIALOG ELEMENTS ===== */
const activityDialog = document.querySelector("#activity-dialog");
const closeDialogButton = document.querySelector("#close-dialog");

const dialogTitle = document.querySelector("#dialog-title");
const dialogBadges = document.querySelector("#dialog-badges");
const dialogDescription = document.querySelector("#dialog-description");
const dialogMaterials = document.querySelector("#dialog-materials");
const dialogInstructions = document.querySelector("#dialog-instructions");

/* ===== GLOBAL VARIABLES ===== */
let allActivities = [];
let filteredActivities = [];
let visibleCount = 6;

const activitiesPerPage = 6;

/* ===== LOAD ACTIVITIES FROM JSON ===== */
async function getActivities() {
    // Disable search while loading data
    searchButton.disabled = true;

    try {
        const response = await fetch("./data/activities.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        // Convert JSON response into JavaScript objects
        allActivities = await response.json();

        // Enable search after successful loading
        searchButton.disabled = false;

        resultsCount.textContent =
            "Use the filters above to find activities.";

    } catch (error) {
        console.error("Error loading activities:", error);

        resultsCount.textContent =
            "Unable to load activities.";

        searchButton.disabled = true;
    }
}


/* ===== OPEN ACTIVITY DETAILS MODAL ===== */
function openActivityDialog(activityId) {

    // Find the selected activity in the original array
    const activity = allActivities.find(
        item => item.id === Number(activityId)
    );

    if (!activity) {
        console.error("Activity not found:", activityId);
        return;
    }

    /* ===== ACTIVITY TITLE ===== */
    dialogTitle.textContent = activity.title;

    /* ===== ACTIVITY DESCRIPTION ===== */
    dialogDescription.textContent = activity.description;

    /* ===== ACTIVITY BADGES ===== */
    dialogBadges.replaceChildren();

    const level = document.createElement("span");
    level.classList.add("activity-level");
    level.textContent = activity.level;

    const skill = document.createElement("span");
    skill.classList.add("activity-skill");
    skill.textContent = activity.skill;

    const duration = document.createElement("span");
    duration.classList.add("activity-duration");
    duration.textContent = `${activity.duration} min`;

    dialogBadges.append(level, skill, duration);

    /* ===== ACTIVITY MATERIALS ===== */
    dialogMaterials.replaceChildren();

    activity.materials.forEach(material => {
        const listItem = document.createElement("li");
        listItem.textContent = material;

        dialogMaterials.appendChild(listItem);
    });

    /* ===== ACTIVITY INSTRUCTIONS ===== */
    dialogInstructions.replaceChildren();

    activity.instructions.forEach(instruction => {
        const listItem = document.createElement("li");
        listItem.textContent = instruction;

        dialogInstructions.appendChild(listItem);
    });

    /* ===== SHOW MODAL ===== */
    activityDialog.showModal();
}



/* ===== FILTER ACTIVITIES ===== */
function filterActivities() {
    // Get selected filter values
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedLevel = levelFilter.value;
    const selectedSkill = skillFilter.value;
    const selectedDuration = durationFilter.value;
    const showFavoritesOnly = favoritesOnly.checked;

    // Get saved favorite IDs
    const favorites = getFavorites();

    /* ===== APPLY FILTERS ===== */
    filteredActivities = allActivities.filter(activity => {
        const matchesSearch = activity.title
            .toLowerCase()
            .includes(searchTerm);

        const matchesLevel =
            selectedLevel === "all" ||
            activity.level.toLowerCase() === selectedLevel;

        const matchesSkill =
            selectedSkill === "all" ||
            activity.skill.toLowerCase() === selectedSkill;

        const matchesDuration =
            selectedDuration === "all" ||
            (selectedDuration === "15" && activity.duration <= 15) ||
            (selectedDuration === "20" && activity.duration <= 20) ||
            (selectedDuration === "30" && activity.duration >= 30);

        const matchesFavorites =
            !showFavoritesOnly ||
            favorites.includes(activity.id);

        return matchesSearch &&
               matchesLevel &&
               matchesSkill &&
               matchesDuration &&
               matchesFavorites;
    });

    /* ===== RESET VISIBLE ACTIVITIES ===== */
    visibleCount = activitiesPerPage;

    showFilteredActivities();
}

/* ===== DISPLAY FILTERED ACTIVITIES ===== */
function showFilteredActivities() {
    // Select only the activities currently visible
    const visibleActivities = filteredActivities.slice(0, visibleCount);

    // Generate activity cards
    displayActivities(visibleActivities);

    // Update results counter
    resultsCount.textContent =
        `Showing ${visibleActivities.length} of ${filteredActivities.length} activities`;

    // Hide Load More when all results are displayed
    loadMoreButton.hidden =
        visibleCount >= filteredActivities.length;

    // Display message when no activities match
    if (filteredActivities.length === 0) {
        resultsCount.textContent =
            "No activities found. Try changing your filters.";
    }
}

/* ===== CREATE ACTIVITY CARDS ===== */
function displayActivities(activities) {
    // Remove previously displayed cards
    activitiesContainer.replaceChildren();

    // Create one card for each activity
    activities.forEach(activity => {

        /* ===== CARD CONTAINER ===== */
        const card = document.createElement("article");
        card.classList.add("activity-card");

        /* ===== ACTIVITY TITLE ===== */
        const title = document.createElement("h3");
        title.textContent = activity.title;

        /* ===== ACTIVITY DESCRIPTION ===== */
        const description = document.createElement("p");
        description.classList.add("activity-description");
        description.textContent = activity.description;

        /* ===== ACTIVITY LEVEL ===== */
        const level = document.createElement("span");
        level.classList.add("activity-level");
        level.textContent = activity.level;

        /* ===== ACTIVITY SKILL ===== */
        const skill = document.createElement("span");
        skill.classList.add("activity-skill");
        skill.textContent = activity.skill;

        /* ===== BADGES CONTAINER ===== */
        const badges = document.createElement("div");
        badges.classList.add("activity-badges");
        badges.append(level, skill);

        /* ===== ACTIVITY DURATION ===== */
        const duration = document.createElement("p");
        duration.classList.add("activity-duration");
        duration.textContent = `Duration: ${activity.duration} min`;

        /* ===== VIEW DETAILS BUTTON ===== */
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("activity-details");
        button.textContent = "View Details";
        button.dataset.id = activity.id;

        button.setAttribute(
            "aria-label",
            `View details for ${activity.title}`
        );

        /* ===== FAVORITE BUTTON ===== */
        const favoriteButton = document.createElement("button");
        favoriteButton.type = "button";
        favoriteButton.classList.add("favorite-button");
        favoriteButton.dataset.id = activity.id;

        const favorite = isFavorite(activity.id);

        favoriteButton.textContent = favorite ? "♥" : "♡";
        favoriteButton.setAttribute("aria-pressed", String(favorite));
        favoriteButton.setAttribute(
            "aria-label",
            `Favorite ${activity.title}`
        );
        favoriteButton.title = favorite
            ? "Remove from favorites"
            : "Add to favorites";

        /* ===== APPEND CARD ELEMENTS ===== */
        /* ===== CARD ACTIONS ===== */
        const cardActions = document.createElement("div");
        cardActions.classList.add("card-actions");

        cardActions.append(button, favoriteButton);

        card.append(
            title,
            description,
            badges,
            duration,
            cardActions
        );

        /* ===== APPEND CARD TO CONTAINER ===== */
        activitiesContainer.appendChild(card);
    });
}

/* ===== SEARCH BUTTON EVENT ===== */
searchButton.addEventListener("click", filterActivities);


/* ===== SEARCH WITH ENTER KEY ===== */
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        if (!searchButton.disabled) {
            filterActivities();
        }
    }
});

/* ===== LOAD MORE BUTTON EVENT ===== */
loadMoreButton.addEventListener("click", () => {
    // Increase the number of visible activities
    visibleCount += activitiesPerPage;

    showFilteredActivities();
});


/* ===== CLEAR FILTERS BUTTON EVENT ===== */
clearButton.addEventListener("click", () => {
    // Reset filter fields
    searchInput.value = "";
    levelFilter.value = "all";
    skillFilter.value = "all";
    durationFilter.value = "all";

    // Reset filtered activities and pagination
    filteredActivities = [];
    visibleCount = activitiesPerPage;
    favoritesOnly.checked = false;

    // Remove displayed cards
    activitiesContainer.replaceChildren();

    // Restore initial message
    resultsCount.textContent =
        "Use the filters above to find activities.";

    // Hide Load More button
    loadMoreButton.hidden = true;
});


/* ===== FAVORITE BUTTON EVENT ===== */
activitiesContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".favorite-button");

    if (!button || !activitiesContainer.contains(button)) {
        return;
    }

    const activityId = Number(button.dataset.id);

    // Add or remove the selected activity
    const favorite = toggleFavorite(activityId);

    // Stop if localStorage could not save the change
    if (favorite === null) {
        resultsCount.textContent =
            "Unable to save favorites in this browser.";
        return;
    }

    // Update the button appearance and accessibility state
    button.textContent = favorite ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(favorite));
    button.title = favorite
        ? "Remove from favorites"
        : "Add to favorites";

    // Refresh results if the favorites filter is active
    if (favoritesOnly.checked) {
        filterActivities();
    }
});


/* ===== VIEW DETAILS BUTTON EVENT ===== */
activitiesContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".activity-details");

    if (!button || !activitiesContainer.contains(button)) {
        return;
    }

    openActivityDialog(button.dataset.id);
});


/* ===== CLOSE MODAL BUTTON EVENT ===== */
closeDialogButton.addEventListener("click", () => {
    activityDialog.close();
});

/* ===== INITIALIZE ACTIVITIES ===== */
getActivities();
