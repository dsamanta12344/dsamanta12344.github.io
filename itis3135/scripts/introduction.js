document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const result = document.getElementById("introResult");
  const clearBtn = document.getElementById("clearBtn");
  const addCourseBtn = document.getElementById("addCourseBtn");
  const coursesDiv = document.getElementById("courses");

  // Function definition BEFORE it's used
  function displayIntro() {
    const data = new FormData(form);
    const imgFile = data.get("picture");
    let imgURL = "images/default.jpg"; // your default image path

    if (imgFile && imgFile.size > 0) {
      imgURL = URL.createObjectURL(imgFile);
    }

    // Build intro page
    result.innerHTML = `
      <section class="intro">
        <h2>Introduction</h2>
        <p><strong>${data.get("firstName")} ${data.get("lastName")}</strong></p>
        <p>${data.get("personalStatement")}</p>
        <img src="${imgURL}" alt="Profile picture" style="max-width:200px">
        <p><em>${data.get("caption")}</em></p>
        <hr>
        <h3>Courses:</h3>
        <ul>
          ${Array.from(document.querySelectorAll(".course")).map((course) => `
            <li>${course.querySelector("[name='dept']").value} ${course.querySelector("[name='number']").value} - ${course.querySelector("[name='courseName']").value}: ${course.querySelector("[name='reason']").value}</li>
          `).join("")}
        </ul>
        <p><q>${data.get("quote")}</q> — ${data.get("author")}</p>
        <p><a href="#" id="resetLink">Reset</a></p>
      </section>
    `;

    document.getElementById("resetLink").addEventListener("click", () => {
      result.innerHTML = "";
      form.style.display = "block";
    });

    form.style.display = "none";
  }

  // Prevent default submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    displayIntro();
  });

  // Clear button
  clearBtn.addEventListener("click", () => {
    form.reset();
    Array.from(form.querySelectorAll("input, textarea")).forEach((el) => el.value = "");
  });

  // Add course button
  addCourseBtn.addEventListener("click", () => {
    const newCourse = document.createElement("div");
    newCourse.classList.add("course");
    newCourse.innerHTML = `
      <label>Department: <input type="text" name="dept"></label>
      <label>Number: <input type="text" name="number"></label>
      <label>Name: <input type="text" name="courseName"></label>
      <label>Reason: <input type="text" name="reason"></label>
      <button type="button" class="deleteCourse">❌</button>
    `;
    coursesDiv.appendChild(newCourse);

    newCourse.querySelector(".deleteCourse").addEventListener("click", () => {
      newCourse.remove();
    });
  });
});