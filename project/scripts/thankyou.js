document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const submissionData = {
        "result-name": "teacherName",
        "result-email": "email",
        "result-title": "activityTitle",
        "result-level": "language-level",
        "result-skill": "activity-category",
        "result-description": "activityDescription"
    };

    Object.entries(submissionData).forEach(([elementId, paramName]) => {
        const element = document.getElementById(elementId);

        if (element) {
            element.textContent = params.get(paramName) || "Not provided";
        }
    });
});