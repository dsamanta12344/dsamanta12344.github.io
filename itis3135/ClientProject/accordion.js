// Accordion Interaction Script
// Expands or collapses the FAQ answers when buttons are clicked

document.querySelectorAll(".accordion-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;

        // Toggle visibility
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});
