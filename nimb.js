const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
 const open = nav.classList.toggle("open");
 menuToggle.setAttribute("aria-expanded", open);
 menuToggle.textContent = open ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
 link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
 });
});

const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
     if (entry.isIntersecting) {
 entry.target.classList.add("visible");
 observer.unobserve(entry.target);
 }
 });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element, index) => {
 element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
 observer.observe(element);
});

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("applicationForm");
const status = document.getElementById("applicationStatus");

form.addEventListener("submit", async (event) => {
if (form.action.includes("YOUR_FORM_ID")) {
 event.preventDefault();
 status.textContent = "Form is ready — replace YOUR_FORM_ID with your Formspree form ID first.";
 return;
 }

 event.preventDefault();
 status.textContent = "Sending application...";

 try {
 const response = await fetch(form.action, {
 method: "POST",
 body: new FormData(form),
 headers: { Accept: "application/json" } });

 if (response.ok) {
 form.reset();
 status.textContent = "Application sent successfully. Thank you!";
 } else {
 status.textContent = "Something went wrong. Please try again.";
 }
 } catch {
 status.textContent = "Unable to send right now. Please try again.";
 }
});