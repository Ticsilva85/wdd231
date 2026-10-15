
/* ================== ACTIVITIES.JS ================== */

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


/* ===== FILTER ACTIVITIES ===== */
function filterActivities() {
    // Get selected filter values
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedLevel = levelFilter.value;
    const selectedSkill = skillFilter.value;
    const selectedDuration = durationFilter.value;

    // Filter activities according to selected criteria
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

        return matchesSearch &&
               matchesLevel &&
               matchesSkill &&
               matchesDuration;
    });

    // Reset visible cards after each search
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
        const card = document.createElement("article");
        card.classList.add("activity-card");

        // Activity title
        const title = document.createElement("h3");
        title.textContent = activity.title;

        // Activity description
        const description = document.createElement("p");
        description.classList.add("activity-description");
        description.textContent = activity.description;

        // Activity level
        const level = document.createElement("p");
        level.classList.add("activity-level");
        level.textContent = `Level: ${activity.level}`;

        // Activity skill
        const skill = document.createElement("p");
        skill.classList.add("activity-skill");
        skill.textContent = `Skill: ${activity.skill}`;

        // Activity duration
        const duration = document.createElement("p");
        duration.classList.add("activity-duration");
        duration.textContent = `Duration: ${activity.duration} min`;

        // View Details button
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("activity-details");
        button.textContent = "View Details";
        button.dataset.id = activity.id;

        button.setAttribute(
            "aria-label",
            `View details for ${activity.title}`
        );

        // Add elements to the card
        card.append(
            title,
            description,
            level,
            skill,
            duration,
            button
        );

        // Add card to the activities container
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

    // Remove displayed cards
    activitiesContainer.replaceChildren();

    // Restore initial message
    resultsCount.textContent =
        "Use the filters above to find activities.";

    // Hide Load More button
    loadMoreButton.hidden = true;
});


/* ===== INITIALIZE ACTIVITIES ===== */
getActivities();
