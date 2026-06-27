const SITE = {
  name: "AStore Glass",
  url: "https://yourusername.github.io/ios-store",
  description: "Kho ứng dụng tĩnh phong cách iOS 18 chạy hoàn toàn bằng HTML, CSS, JavaScript và JSON.",
  pages: {
    home: "index.html",
    app: "app.html",
    download: "download.html",
    blog: "blog.html",
    article: "article.html"
  }
};

const DATA_CACHE = new Map();

async function fetchJSON(path) {
  if (DATA_CACHE.has(path)) return DATA_CACHE.get(path);
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Không thể tải dữ liệu: ${path}`);
  const data = await response.json();
  DATA_CACHE.set(path, data);
  return data;
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function escapeHTML(str = "") {
  return String(str).replace(/[&<>"']/g, (char) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char];
  });
}

function formatMetaList(items = []) {
  return items.filter(Boolean).map((item) => `<span>${escapeHTML(item)}</span>`).join("");
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) toggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  setTheme(saved || preferred);
}

function setMeta({ title, description, image, type = "website" }) {
  if (title) document.title = title;
  const metaMap = {
    description: description || SITE.description,
    "og:title": title || document.title,
    "og:description": description || SITE.description,
    "og:type": type,
    "og:image": image ? new URL(image, window.location.href).href : new URL("assets/img/logo-mark.svg", window.location.href).href,
    "twitter:title": title || document.title,
    "twitter:description": description || SITE.description,
    "twitter:image": image ? new URL(image, window.location.href).href : new URL("assets/img/logo-mark.svg", window.location.href).href
  };

  Object.entries(metaMap).forEach(([key, value]) => {
    const selector = key.startsWith("og:") || key.startsWith("twitter:")
      ? `meta[property="${key}"], meta[name="${key}"]`
      : `meta[name="${key}"]`;
    const element = document.querySelector(selector);
    if (element) element.setAttribute("content", value);
  });
}

function renderShell(page) {
  const header = document.getElementById("site-header");
  const mobileNav = document.getElementById("mobile-nav");
  const footer = document.getElementById("site-footer");
  const links = [
    { key: "home", href: "index.html", label: "Trang chủ" },
    { key: "blog", href: "blog.html", label: "Blog" }
  ];

  if (header) {
    header.innerHTML = `
      <div class="topbar glass fade-up">
        <a class="brand" href="index.html" aria-label="AStore Glass">
          <img src="assets/img/logo-mark.svg" alt="AStore Glass" width="38" height="38" />
          <span>AStore Glass</span>
        </a>
        <nav class="desktop-nav" aria-label="Điều hướng chính">
          ${links.map(link => `<a href="${link.href}" class="${page === link.key ? "active" : ""}">${link.label}</a>`).join("")}
        </nav>
        <div class="topbar-actions">
          <button class="theme-toggle" type="button" data-theme-toggle aria-label="Đổi giao diện">🌙</button>
        </div>
      </div>
    `;
  }

  if (mobileNav) {
    mobileNav.className = "mobile-nav glass";
    mobileNav.innerHTML = `
      <nav aria-label="Điều hướng nhanh">
        <a href="index.html" class="${page === "home" ? "active" : ""}">Khám phá</a>
        <a href="blog.html" class="${page === "blog" ? "active" : ""}">Blog</a>
        <a href="index.html#search" class="${page === "search" ? "active" : ""}">Tìm kiếm</a>
        <a href="download.html?id=dragon-ball-legends" class="${page === "download" ? "active" : ""}">Tải về</a>
      </nav>
    `;
  }

  if (footer) {
    footer.className = "footer glass";
    footer.innerHTML = `
      <p>Thiết kế static iOS 18, chạy tốt trên GitHub Pages, không cần backend.</p>
      <p>Dữ liệu được render từ <code>data/apps.json</code> và <code>data/posts.json</code>.</p>
    `;
  }

  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.textContent = (document.documentElement.getAttribute("data-theme") || "light") === "dark" ? "☀️" : "🌙";
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }
}

function appRowTemplate(app) {
  return `
    <article class="app-row glass fade-up" aria-label="${escapeHTML(app.name)}">
      <a href="app.html?id=${encodeURIComponent(app.id)}" aria-label="${escapeHTML(app.name)}">
        <img src="${app.icon}" alt="${escapeHTML(app.name)}" width="74" height="74" loading="lazy" />
      </a>
      <div>
        <a class="title" href="app.html?id=${encodeURIComponent(app.id)}">${escapeHTML(app.name)}</a>
        <div class="meta">${escapeHTML(app.subtitle)}</div>
        <div class="meta-line">
          <span>v${escapeHTML(app.version)}</span>
          <span>${escapeHTML(app.size)}</span>
          <span>${escapeHTML(app.os)}</span>
        </div>
      </div>
      <div class="card-actions">
        <a class="btn btn-primary" href="download.html?id=${encodeURIComponent(app.id)}">Tải xuống</a>
      </div>
    </article>
  `;
}

function featureCardTemplate(app) {
  return `
    <article class="feature-card glass fade-up">
      <div>
        <span class="chip">${escapeHTML(app.heroTag || app.badge || "Nổi bật")}</span>
        <h3 style="margin: 16px 0 8px; font-size: 1.4rem;">${escapeHTML(app.name)}</h3>
        <p>${escapeHTML(app.subtitle)}</p>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <img src="${app.icon}" alt="${escapeHTML(app.name)}" width="68" height="68" loading="lazy" />
        <a class="btn btn-secondary" href="app.html?id=${encodeURIComponent(app.id)}">Xem chi tiết</a>
      </div>
    </article>
  `;
}

function relatedCardTemplate(app) {
  return `
    <article class="related-card glass fade-up">
      <img src="${app.icon}" alt="${escapeHTML(app.name)}" width="74" height="74" loading="lazy" style="width:74px;height:74px;border-radius:22px;" />
      <h3 style="margin:16px 0 8px;font-size:1.15rem;">${escapeHTML(app.name)}</h3>
      <p>${escapeHTML(app.subtitle)}</p>
      <a class="btn btn-secondary" href="app.html?id=${encodeURIComponent(app.id)}" style="margin-top:12px;">Mở trang</a>
    </article>
  `;
}

function blogCardTemplate(post) {
  return `
    <article class="blog-card glass fade-up">
      <a href="article.html?id=${encodeURIComponent(post.id)}">
        <img src="${post.thumbnail}" alt="${escapeHTML(post.title)}" width="640" height="400" loading="lazy" />
      </a>
      <div style="margin-top:16px;">
        <div class="chip">${escapeHTML(post.category)}</div>
        <h3 style="font-size:1.35rem;margin:14px 0 10px;"><a href="article.html?id=${encodeURIComponent(post.id)}">${escapeHTML(post.title)}</a></h3>
        <p>${escapeHTML(post.excerpt)}</p>
        <div class="meta-line">
          <span>${escapeHTML(post.date)}</span>
          <span>${escapeHTML(post.readTime)}</span>
        </div>
      </div>
    </article>
  `;
}

function initFaq(container) {
  container.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".faq-item").classList.toggle("open");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
});
