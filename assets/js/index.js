async function initHome() {
  renderShell("home");
  const apps = await fetchJSON("data/apps.json");
  const posts = await fetchJSON("data/posts.json");
  const featured = apps.find((app) => app.featuredGame) || apps[0];

  setMeta({
    title: "AStore Glass | Kho ứng dụng tĩnh phong cách iOS 18",
    description: "Website static HTML, CSS, JS và JSON mô phỏng App Store/iOSGods với dark mode, blog, download page và thiết kế responsive.",
    image: featured.icon
  });

  const hero = document.getElementById("home-hero");
  hero.innerHTML = `
    <section class="hero-card fade-up">
      <span class="hero-tag">${escapeHTML(featured.heroTag)} • v${escapeHTML(featured.version)}</span>
      <h1 class="hero-title">${escapeHTML(featured.name)}</h1>
      <p class="hero-text">${escapeHTML(featured.description)}</p>
      <div class="hero-actions">
        <a class="btn btn-secondary" href="app.html?id=${encodeURIComponent(featured.id)}">Chi tiết ứng dụng</a>
        <a class="btn btn-primary" href="download.html?id=${encodeURIComponent(featured.id)}">Tải IPA</a>
      </div>
      <div class="hero-meta">
        <div class="meta-item">
          <strong>${escapeHTML(featured.size)}</strong>
          <span>Kích thước</span>
        </div>
        <div class="meta-item">
          <strong>${escapeHTML(featured.updatedRelative)}</strong>
          <span>Cập nhật</span>
        </div>
        <div class="meta-item">
          <strong>${escapeHTML(featured.views)}</strong>
          <span>Lượt xem</span>
        </div>
      </div>
    </section>
  `;

  document.getElementById("featured-games").innerHTML = apps
    .filter((app) => app.featuredGame)
    .map(featureCardTemplate)
    .join("");

  document.getElementById("featured-apps").innerHTML = apps
    .filter((app) => app.featuredApp)
    .map(featureCardTemplate)
    .join("");

  document.getElementById("whats-new").innerHTML = apps
    .filter((app) => app.isNew)
    .map(appRowTemplate)
    .join("");

  const list = document.getElementById("app-list");
  list.innerHTML = apps.map(appRowTemplate).join("");

  const homeBlog = document.getElementById("home-blog");
  homeBlog.innerHTML = posts.slice(0, 3).map(blogCardTemplate).join("");
}

document.addEventListener("DOMContentLoaded", initHome);
