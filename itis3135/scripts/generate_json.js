document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const generateJSONBtn = document.getElementById("generateJSONBtn");
  const h2 = document.querySelector("main h2");
  const resultDiv = document.getElementById("introResult");

  generateJSONBtn.addEventListener("click", () => {
    const formData = new FormData(form);

    // Build JSON
    const jsonData = {
      name: {
        first: formData.get("firstName"),
        middle: formData.get("middleName") || null,
        nickname: formData.get("nickname") || null,
        last: formData.get("lastName")
      },
      acknowledgment: {
        statement: formData.get("acknowledgment"),
        date: formData.get("ackDate")
      },
      mascot: {
        adjective: formData.get("mascotAdj"),
        animal: formData.get("mascotAnimal"),
        divider: formData.get("divider")
      },
      picture: {
        caption: formData.get("caption")
      },
      personalStatement: formData.get("personalStatement"),
      courses: [],
      quote: {
        text: formData.get("quote"),
        author: formData.get("author")
      },
      extras: {
        funnyThing: formData.get("funnyThing") || null,
        share: formData.get("share") || null
      },
      links: []
    };

    // Add courses
    document.querySelectorAll("#courses .course").forEach((course) => {
      jsonData.courses.push({
        department: course.querySelector('[name="dept"]').value,
        number: course.querySelector('[name="number"]').value,
        name: course.querySelector('[name="courseName"]').value,
        reason: course.querySelector('[name="reason"]').value
      });
    });

    // Add links
    ["link1", "link2", "link3", "link4", "link5"].forEach((field) => {
      const linkValue = formData.get(field);
      if (linkValue) {
        jsonData.links.push(linkValue);
      }
    });

    // Pretty-print JSON
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Change heading
    h2.textContent = "Introduction JSON";

    // Hide form
    form.style.display = "none";

    // Display formatted + highlighted JSON
    resultDiv.innerHTML = `
      <section>
        <pre><code class="language-json">${jsonString.replace(/</g, "&lt;")}</code></pre>
      </section>
    `;

    // Highlight
    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }
  });
});
