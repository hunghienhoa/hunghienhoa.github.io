async function initCategoryPage() {
  const type = document.body.dataset.category || "app";
  const intro = categoryIntro(type);
  renderShell(intro.page);

  const apps = await fetchJSON("data/apps.json");
  const filtered = apps.filter((app) => app.category === type);

  setMeta({
    title: `${intro.title} | AStore Glass`,
    description: intro.description,
    image: filtered[0]?.icon
  });

  const root = document.getElementById("category-root");
  root.innerHTML = `
    <section class="category-hero glass fade-up">
      <span class="chip">${escapeHTML(intro.title)}</span>
      <h1 class="detail-title">${escapeHTML(intro.title)}</h1>
      <p class="article-lead">${escapeHTML(intro.lead)}</p>
      <div class="category-summary">
        <div class="mini-stat glass">
          <strong>${filtered.length}</strong>
          <span class="muted">Mục hiển thị</span>
        </div>
        <div class="mini-stat glass">
          <strong>${escapeHTML(type === "game" ? "Kho game" : "Kho app")}</strong>
          <span class="muted">Chế độ lọc</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="listing">
        ${filtered.map(appRowTemplate).join("")}
      </div>
    </section>
  `;

  if (window.RtdbCounters && window.RtdbCounters.isEnabled && window.RtdbCounters.isEnabled()) {
    window.RtdbCounters.bindCounterElements(root);
  }
}

document.addEventListener("DOMContentLoaded", initCategoryPage);
