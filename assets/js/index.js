async function initHome() {
  renderShell("home");
  const apps = await fetchJSON("data/apps.json");
  const posts = await fetchJSON("data/posts.json");
  const featured = apps.find((app) => app.featuredGame) || apps[0];
  const homeLimit = 10;

  setMeta({
    title: "Tôi Share Mod | Website chia sẻ ứng dụng, game, file IPA và các bài viết hướng dẫn, thủ thuật công nghệ mới nhất dành cho mọi người dùng.",
    description: "Website chia sẻ ứng dụng, game, file IPA và các bài viết hướng dẫn, thủ thuật công nghệ mới nhất dành cho mọi người dùng.",
    image: featured.icon
  });

  document.getElementById("featured-games").innerHTML = apps
    .filter((app) => app.featuredGame)
    .slice(0, homeLimit)
    .map(appRowTemplate)
    .join("");

  document.getElementById("featured-apps").innerHTML = apps
    .filter((app) => app.featuredApp)
    .slice(0, homeLimit)
    .map(appRowTemplate)
    .join("");

  document.getElementById("whats-new").innerHTML = apps
    .filter((app) => app.isNew)
    .slice(0, homeLimit)
    .map(appRowTemplate)
    .join("");

  const list = document.getElementById("app-list");
  list.innerHTML = apps.slice(0, homeLimit).map(appRowTemplate).join("");

  const homeBlog = document.getElementById("home-blog");
  homeBlog.innerHTML = posts.slice(0, 6).map(blogCardTemplate).join("");

  if (window.RtdbCounters && window.RtdbCounters.isEnabled && window.RtdbCounters.isEnabled()) {
    window.RtdbCounters.bindCounterElements(document);
  }
}

document.addEventListener("DOMContentLoaded", initHome);
