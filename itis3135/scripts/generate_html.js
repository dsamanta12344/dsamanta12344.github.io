document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const generateBtn = document.getElementById("generateHTMLBtn");
  const h2 = document.querySelector("main h2");
  const resultDiv = document.getElementById("introResult");

  generateBtn.addEventListener("click", () => {
    const formData = new FormData(form);

    let htmlOutput = `
<section>
  <h3>${formData.get("firstName")} ${formData.get("middleName") || ""} ${formData.get("lastName")}</h3>
  <p><strong>Nickname:</strong> ${formData.get("nickname") || "None"}</p>

  <p>${formData.get("acknowledgment")} (${formData.get("ackDate")})</p>

  <h4>Mascot:</h4>
  <p>${formData.get("mascotAdj")} ${formData.get("mascotAnimal")} ${formData.get("divider")}</p>

  <p>${formData.get("personalStatement")}</p>

  <h4>Courses:</h4>
  <ul>
`;

    const courses = document.querySelectorAll("#courses .course");
    courses.forEach((course) => {
      const dept = course.querySelector('[name="dept"]').value;
      const number = course.querySelector('[name="number"]').value;
      const courseName = course.querySelector('[name="courseName"]').value;
      const reason = course.querySelector('[name="reason"]').value;

      htmlOutput += `<li>${dept} ${number}: ${courseName} — ${reason}</li>`;
    });

    htmlOutput += `
  </ul>

  <blockquote>
    "${formData.get("quote")}" — ${formData.get("author")}
  </blockquote>

  <p><strong>Funny thing:</strong> ${formData.get("funnyThing") || "None"}</p>
  <p><strong>Something to share:</strong> ${formData.get("share") || "None"}</p>

  <h4>Links:</h4>
  <ul>
    <li><a href="${formData.get("link1")}">${formData.get("link1")}</a></li>
    <li><a href="${formData.get("link2")}">${formData.get("link2")}</a></li>
`;

    // Add optional links (3-5) if filled
    ["link3", "link4", "link5"].forEach((linkField) => {
      const value = formData.get(linkField);
      if (value) {
        htmlOutput += `<li><a href="${value}">${value}</a></li>`;
      }
    });

    htmlOutput += `
  </ul>
</section>`;

    // Change title
    h2.textContent = "Introduction HTML";

    // Hide form
    form.style.display = "none";

    // Output formatted code
    resultDiv.innerHTML = `
      <section>
        <pre><code class="language-html">${htmlOutput
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</code></pre>
      </section>
    `;

    // Re-run highlighting
    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }
  });
});
