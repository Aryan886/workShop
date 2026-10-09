// profile.js holds the content. This file puts it on the page.
document.title = profile.name + " | Portfolio";
document.getElementById("name").textContent = profile.name;
document.getElementById("role").textContent = profile.role;
document.getElementById("tagline").textContent = profile.tagline;
document.getElementById("about-text").textContent = profile.about;

const skills = document.getElementById("skills");

for (const skill of profile.skills) {
  const item = document.createElement("li");
  item.textContent = skill;
  skills.appendChild(item);
}

// Optional fields let the Version 1 profile work before projects are added.
const projects = profile.projects || [];
const projectList = document.getElementById("project-list");
document.getElementById("projects-empty").hidden = projects.length > 0;

for (const project of projects) {
  const card = document.createElement("article");
  card.className = "project-card";

  const name = document.createElement("h3");
  name.textContent = project.name;

  const description = document.createElement("p");
  description.textContent = project.description;

  const tech = document.createElement("p");
  tech.className = "muted";
  tech.textContent = (project.tech || []).join(" / ");

  card.appendChild(name);
  card.appendChild(description);
  card.appendChild(tech);
  addLink(card, "View project", project.link);
  projectList.appendChild(card);
}

const contactLinks = document.getElementById("contact-links");
addLink(contactLinks, "GitHub", profile.github);
addLink(contactLinks, "LinkedIn", profile.linkedin);

if (profile.email) {
  const emailLink = document.createElement("a");
  emailLink.textContent = "Email me";
  emailLink.href = "mailto:" + profile.email;
  contactLinks.appendChild(emailLink);
}

document.getElementById("contact-empty").hidden = contactLinks.children.length > 0;

// Reuse one small function for project links and social links.
function addLink(container, text, url) {
  if (!url) {
    return;
  }

  // Only full web addresses are accepted; accidental unsafe links stay hidden.
  try {
    const address = new URL(url);
    if (address.protocol !== "https:" && address.protocol !== "http:") {
      console.warn("Use an https:// web address for " + text + ":", url);
      return;
    }
  } catch (error) {
    console.warn("Check the web address for " + text + ":", url, error);
    return;
  }

  const link = document.createElement("a");
  link.textContent = text;
  link.href = url;
  container.appendChild(link);
}

// Optional exercise: change the button labels or the dark colours in CSS.
const themeButton = document.getElementById("theme-button");
themeButton.hidden = false;
themeButton.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark");
  themeButton.textContent = isDark ? "Light mode" : "Dark mode";
  themeButton.setAttribute("aria-pressed", isDark);
});
