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

  document.getElementById("featured-games").innerHTML = apps
    .filter((app) => app.category === "game")
    .slice(0, 6)
    .map((app) => appRowTemplate(app, { compact: true, showCounters: false }))
    .join("");

  document.getElementById("featured-apps").innerHTML = apps
    .filter((app) => app.category === "app")
    .slice(0, 6)
    .map((app) => appRowTemplate(app, { compact: true, showCounters: false }))
    .join("");

  document.getElementById("whats-new").innerHTML = apps
    .filter((app) => app.isNew)
    .map((app) => appRowTemplate(app, { compact: true, showCounters: false }))
    .join("");

  const list = document.getElementById("app-list");
  list.innerHTML = apps.slice(0, 6).map((app) => appRowTemplate(app, { compact: true, showCounters: false })).join("");

  const homeBlog = document.getElementById("home-blog");
  homeBlog.innerHTML = posts.slice(0, 3).map(blogCardTemplate).join("");

  if (window.RtdbCounters && window.RtdbCounters.isEnabled && window.RtdbCounters.isEnabled()) {
    window.RtdbCounters.bindCounterElements(document);
  }
}

document.addEventListener("DOMContentLoaded", initHome);
