// ===== SUGGESTION FORM =====

const suggestionForm = document.querySelector(".suggest-aside form");

if (suggestionForm) {
    suggestionForm.addEventListener("submit", (event) => {

        // Get form values
        const teacherName = document
            .querySelector("#teacher-name").value.trim();

        const activityTitle = document
            .querySelector("#activity-title").value.trim();

        const activityDescription = document
            .querySelector("#activity-description").value.trim();

        // Validate empty fields
        if (!teacherName || !activityTitle || !activityDescription) {
            event.preventDefault();

            alert("Please complete all required fields.");
            return;
        }

        // Remove unnecessary spaces
        document.querySelector("#teacher-name").value = teacherName;
        document.querySelector("#activity-title").value = activityTitle;
        document.querySelector("#activity-description").value = activityDescription;
    });
}