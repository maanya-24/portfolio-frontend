// IMPORTANT: replace this with your deployed backend URL once you deploy it
// e.g. "https://your-backend-name.onrender.com/api/projects"
const API_URL = "https://portfolio-backend-abxl.onrender.com/api/projects";

async function loadProjects() {
  const listEl = document.getElementById("project-list");
  try {
    const res = await fetch(API_URL);
    const projects = await res.json();

    if (!projects.length) {
      listEl.innerHTML = "<p>No projects added yet. Add some via the API!</p>";
      return;
    }

    listEl.innerHTML = projects.map(p => `
      <div class="project-card">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="tech-tags">
          ${(p.techStack || []).map(t => `<span>${t}</span>`).join("")}
        </div>
        <div class="links">
          ${p.githubLink ? `<a href="${p.githubLink}" target="_blank">GitHub</a>` : ""}
          ${p.liveLink ? `<a href="${p.liveLink}" target="_blank">Live Demo</a>` : ""}
        </div>
      </div>
    `).join("");
  } catch (err) {
    listEl.innerHTML = "<p>Could not load projects. Is the backend running?</p>";
    console.error(err);
  }
}

loadProjects();
