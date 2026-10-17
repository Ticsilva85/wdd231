// ===== HAMBURGER BUTTON ===== //

const navbutton = document.querySelector('#menu');
const navmenu = document.querySelector('#header-menu');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navmenu.classList.toggle('show');

    const isOpen = navbutton.classList.contains('show');

    navbutton.setAttribute('aria-expanded', isOpen);

    navbutton.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
});

// ===== CURRENT YEAR ===== //
const currentYear = new Date().getFullYear();

document.querySelector('#currentyear').textContent = currentYear;

// ===== LAST MODIFIED DATE ===== //
const lastModified = document.lastModified;

document.querySelector('#lastModified').textContent = `Last Modification: ${lastModified}`;

// ===== HOME ===== //


/* ================== HOME FEATURED ACTIVITIES ================== */

/* ===== DOM ELEMENTS ===== */
const featuredContainer = document.querySelector("#featured-container");

if (featuredContainer) {

    const activityDialog = document.querySelector("#activity-dialog");
    const closeDialogButton = document.querySelector("#close-dialog");

    const dialogTitle = document.querySelector("#dialog-title");
    const dialogBadges = document.querySelector("#dialog-badges");
    const dialogDescription = document.querySelector("#dialog-description");
    const dialogMaterials = document.querySelector("#dialog-materials");
    const dialogInstructions = document.querySelector("#dialog-instructions");

    /* ===== FEATURED ACTIVITY IDS ===== */
    const featuredIds = [1, 5, 12];

    let featuredActivities = [];

    /* ===== LOAD ACTIVITIES FROM JSON ===== */
    async function getFeaturedActivities() {
        try {
            const response = await fetch("./data/activities.json");

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const allActivities = await response.json();

            featuredActivities = allActivities.filter(activity =>
                featuredIds.includes(activity.id)
            );

            displayFeaturedActivities(featuredActivities);

        } catch (error) {
            console.error("Error loading featured activities:", error);

            featuredContainer.textContent =
                "Unable to load featured activities.";
        }
    }

    /* ===== DISPLAY FEATURED ACTIVITIES ===== */
    function displayFeaturedActivities(activities) {

        featuredContainer.replaceChildren();

        activities.forEach(activity => {

            const card = document.createElement("article");
            card.classList.add("activity-card");

            /* ===== TITLE ===== */
            const title = document.createElement("h3");
            title.textContent = activity.title;

            /* ===== DESCRIPTION ===== */
            const description = document.createElement("p");
            description.classList.add("activity-description");
            description.textContent = activity.description;

            /* ===== LEVEL ===== */
            const level = document.createElement("span");
            level.classList.add("activity-level");
            level.textContent = activity.level;

            /* ===== SKILL ===== */
            const skill = document.createElement("span");
            skill.classList.add("activity-skill");
            skill.textContent = activity.skill;

            /* ===== BADGES ===== */
            const badges = document.createElement("div");
            badges.classList.add("activity-badges");
            badges.append(level, skill);

            /* ===== DURATION ===== */
            const duration = document.createElement("p");
            duration.classList.add("activity-duration");
            duration.textContent = `Duration: ${activity.duration} min`;

            /* ===== DETAILS BUTTON ===== */
            const button = document.createElement("button");
            button.type = "button";
            button.classList.add("activity-details");
            button.textContent = "View Details";
            button.dataset.id = activity.id;

            button.setAttribute(
                "aria-label",
                `View details for ${activity.title}`
            );

            /* ===== CARD ELEMENTS ===== */
            card.append(
                title,
                description,
                badges,
                duration,
                button
            );

            featuredContainer.appendChild(card);
        });
    }

    /* ===== OPEN ACTIVITY DIALOG ===== */
    function openActivityDialog(activityId) {

        const activity = featuredActivities.find(
            item => item.id === Number(activityId)
        );

        if (!activity) {
            return;
        }

        dialogTitle.textContent = activity.title;
        dialogDescription.textContent = activity.description;

        /* ===== BADGES ===== */
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

        /* ===== MATERIALS ===== */
        dialogMaterials.replaceChildren();

        activity.materials.forEach(material => {
            const li = document.createElement("li");
            li.textContent = material;
            dialogMaterials.appendChild(li);
        });

        /* ===== INSTRUCTIONS ===== */
        dialogInstructions.replaceChildren();

        activity.instructions.forEach(instruction => {
            const li = document.createElement("li");
            li.textContent = instruction;
            dialogInstructions.appendChild(li);
        });

        activityDialog.showModal();
    }

    /* ===== DETAILS BUTTON EVENT ===== */
    featuredContainer.addEventListener("click", (event) => {

        const button = event.target.closest(".activity-details");

        if (!button || !featuredContainer.contains(button)) {
            return;
        }

        openActivityDialog(button.dataset.id);
    });

    /* ===== CLOSE DIALOG BUTTON ===== */
    closeDialogButton.addEventListener("click", () => {
        activityDialog.close();
    });

    /* ===== CLOSE DIALOG ON BACKDROP CLICK ===== */
    activityDialog.addEventListener("click", (event) => {
        if (event.target === activityDialog) {
            activityDialog.close();
        }
    });

    /* ===== INITIALIZE ===== */
    getFeaturedActivities();
}
