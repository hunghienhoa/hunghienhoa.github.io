const HOME_SECTIONS = {
  "featured-games": {
    title: "Trò chơi nổi bật",
    description: "Danh sách toàn bộ trò chơi nổi bật được chọn hiển thị riêng trên Tôi Share Mod.",
    lead: "Trang này chỉ hiển thị các trò chơi được đánh dấu nổi bật.",
    filter: (app) => app.featuredGame
  },
  "featured-apps": {
    title: "Ứng dụng nổi bật",
    description: "Danh sách toàn bộ ứng dụng nổi bật được chọn hiển thị riêng trên Tôi Share Mod.",
    lead: "Trang này chỉ hiển thị các ứng dụng được đánh dấu nổi bật.",
    filter: (app) => app.featuredApp
  },
  "whats-new": {
    title: "Có gì mới",
    description: "Danh sách các ứng dụng và trò chơi mới nhất trên Tôi Share Mod.",
    lead: "Trang này chỉ hiển thị các mục đang được đánh dấu mới cập nhật.",
    filter: (app) => app.isNew
  },
  "all-apps": {
    title: "Tất cả ứng dụng",
    description: "Danh sách toàn bộ ứng dụng và trò chơi hiện có trên Tôi Share Mod.",
    lead: "Trang này hiển thị đầy đủ tất cả mục đang có trong kho.",
    filter: () => true
  }
};

async function initCollectionPage() {
  const key = getParam("section") || "all-apps";
  const config = HOME_SECTIONS[key] || HOME_SECTIONS["all-apps"];
  renderShell("");

  const apps = await fetchJSON("data/apps.json");
  const filtered = apps.filter(config.filter);

  setMeta({
    title: `${config.title} | Tôi Share Mod`,
    description: config.description,
    image: filtered[0]?.icon || "assets/img/logo-mark.svg"
  });

  const root = document.getElementById("collection-root");
  root.innerHTML = `
    <div class="page-backbar">
      <a class="back-link" href="index.html">← Quay lại trang chủ</a>
    </div>

    <section class="category-hero glass fade-up">
      <h1 class="detail-title">${escapeHTML(config.title)}</h1>
      <p class="article-lead">${escapeHTML(config.lead)}</p>
      <div class="category-summary">
        <div class="mini-stat glass">
          <strong>${filtered.length}</strong>
          <span class="muted">Mục hiển thị</span>
        </div>
        <div class="mini-stat glass">
          <strong>${escapeHTML(key === "all-apps" ? "Toàn bộ kho" : "Lọc theo mục")}</strong>
          <span class="muted">Chế độ xem</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="listing listing-compact" id="collection-list"></div>
    </section>
  `;

  document.getElementById("collection-list").innerHTML = filtered.map(appRowTemplate).join("");

  if (window.RtdbCounters && window.RtdbCounters.isEnabled && window.RtdbCounters.isEnabled()) {
    window.RtdbCounters.bindCounterElements(root);
  }
}

document.addEventListener("DOMContentLoaded", initCollectionPage);
