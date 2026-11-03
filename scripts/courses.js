/*
 * WDD 231 course list.
 * Confirm the official course titles/credits against the course-provided
 * courses.js file. Set completed:true only for courses you have personally
 * completed. Based on prior coursework, CSE 110 and WDD 131 are marked true;
 * edit these values if your actual completion record differs.
 */
const courses = [
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: false },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: false },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: false },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false },
  { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, completed: false }
];

const courseList = document.querySelector("#course-list");
const courseCount = document.querySelector("#course-count");
const creditTotal = document.querySelector("#credit-total");
const filterButtons = document.querySelectorAll("[data-filter]");

function displayCourses(filter = "all") {
  const visibleCourses = filter === "all"
    ? courses
    : courses.filter((course) => course.subject === filter);

  courseList.innerHTML = "";

  visibleCourses.forEach((course) => {
    const card = document.createElement("article");
    card.className = course.completed ? "course-card completed" : "course-card";

    const code = document.createElement("p");
    code.className = "course-code";
    code.textContent = `${course.subject} ${course.number}`;

    const title = document.createElement("h3");
    title.textContent = course.title;

    const credits = document.createElement("p");
    credits.className = "course-meta";
    credits.textContent = `${course.credits} credits`;

    const status = document.createElement("span");
    status.className = "course-status";
    status.textContent = course.completed ? "Completed" : "Not completed";

    card.append(code, title, credits, status);
    courseList.append(card);
  });

  const creditsShown = visibleCourses.reduce((total, course) => total + course.credits, 0);
  courseCount.textContent = `${visibleCourses.length} ${visibleCourses.length === 1 ? "course" : "courses"}`;
  creditTotal.textContent = `${creditsShown} ${creditsShown === 1 ? "credit" : "credits"}`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    displayCourses(button.dataset.filter);
  });
});

displayCourses();
