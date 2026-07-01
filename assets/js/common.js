const SITE = {
  name: "Tôi Share Mod",
  url: "https://toisharemod.com",
  description: "Chia sẻ ứng dụng, game, file IPA và bài viết hướng dẫn cài đặt dành cho người dùng iPhone, iPad trên giao diện tối ưu cho điện thoại.",
  pages: {
    home: "index.html",
    games: "games.html",
    apps: "apps.html",
    search: "search.html",
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
  const toolLinks = [
    { href: "sign-application.html", label: "iPA Sign" }
  ];
  const mobileLinks = [
    {
      key: "home",
      href: "index.html",
      label: "Trang chủ",
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1z"/></svg>`
    },
    {
      key: "games",
      href: "games.html",
      label: "Trò chơi",
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 8h9a4.5 4.5 0 0 1 4.43 5.3l-.62 3.41A3 3 0 0 1 17.36 19h-1.55a2 2 0 0 1-1.41-.59l-1.34-1.34a1.5 1.5 0 0 0-2.12 0L9.6 18.4A2 2 0 0 1 8.2 19H6.64a3 3 0 0 1-2.95-2.29l-.62-3.4A4.5 4.5 0 0 1 7.5 8Zm.5 2.5h-1.5V12H5v1.5h1.5V15H8v-1.5h1.5V12H8Zm8.25 1.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1.75 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>`
    },
    {
      key: "apps",
      href: "apps.html",
      label: "Ứng dụng",
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm8 0h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM5 11h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Zm8 4h8v2h-8z"/></svg>`
    },
    {
      key: "search",
      href: "search.html",
      label: "Tìm kiếm",
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm8.9 11.5 1.4 1.4-2 2-1.4-1.4-2.15-2.15 2-2z"/></svg>`
    },
    {
      key: "blog",
      href: "blog.html",
      label: "Blog",
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h9a3 3 0 0 1 3 3v13H8a4 4 0 0 0-2 .54A2.5 2.5 0 0 1 4 18.1V6a2 2 0 0 1 2-2Zm3 4v2h6V8Zm0 4v2h6v-2ZM6 8h1.5v1.5H6Zm0 4h1.5v1.5H6Z"/></svg>`
    }
  ];
  const links = [
    { key: "home", href: "index.html", label: "Trang chủ" },
    { key: "games", href: "games.html", label: "Trò chơi" },
    { key: "apps", href: "apps.html", label: "Ứng dụng" },
    { key: "search", href: "search.html", label: "Tìm kiếm" },
    { key: "blog", href: "blog.html", label: "Blog" }
  ];

  if (header) {
    header.innerHTML = `
      <div class="topbar glass fade-up">
        <div class="topbar-tools" aria-label="Khu công cụ mở rộng">
          <button class="topbar-icon-button" type="button" data-tools-toggle aria-label="Mở công cụ">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM5 9.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Zm14 0a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM12 16.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z"/></svg>
          </button>
          <div class="topbar-tools-list" data-tools-menu>
            ${toolLinks.map(link => `<a href="${link.href}" class="topbar-tool-link">${link.label}</a>`).join("")}
          </div>
        </div>
        <a class="brand" href="index.html" aria-label="Tôi Share Mod">
          <img src="assets/img/logo-mark.svg" alt="Tôi Share Mod" width="38" height="38" />
          <span>Tôi Share Mod</span>
        </a>
        <nav class="desktop-nav" aria-label="Điều hướng chính">
          ${links.map(link => `<a href="${link.href}" class="${page === link.key ? "active" : ""}">${link.label}</a>`).join("")}
        </nav>
        <div class="topbar-actions">
          <button class="topbar-menu-button" type="button" data-mobile-menu-toggle aria-label="Mở menu">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v2H4zm0 6h16v2H4zm0 6h16v2H4z"/></svg>
          </button>
        </div>
      </div>
      <div class="topbar-mobile-panel glass" data-mobile-menu>
        <div class="topbar-mobile-links">
          ${links.map(link => `<a href="${link.href}" class="${page === link.key ? "active" : ""}">${link.label}</a>`).join("")}
        </div>
        <div class="topbar-mobile-tools">
          <span class="topbar-mobile-tools-title">Công cụ</span>
          <div class="topbar-mobile-tools-list">
            ${toolLinks.map(link => `<a href="${link.href}" class="topbar-tool-link">${link.label}</a>`).join("")}
          </div>
        </div>
      </div>
    `;
  }

  if (mobileNav) {
    mobileNav.className = "mobile-nav glass";
    mobileNav.innerHTML = `
      <nav aria-label="Điều hướng nhanh">
        ${mobileLinks.map(link => `
          <a href="${link.href}" class="${page === link.key ? "active" : ""}">
            <span class="mobile-nav-icon">${link.icon}</span>
            <span class="mobile-nav-label">${link.label}</span>
          </a>
        `).join("")}
      </nav>
    `;
  }

  if (footer) {
    footer.className = "footer glass fade-up";
    footer.innerHTML = `
      <div class="footer-grid">
        <div class="footer-brand footer-highlight">
          <span class="footer-badge">Kho ứng dụng & bài viết</span>
          <a class="brand footer-brand-link" href="index.html" aria-label="Tôi Share Mod">
            <img src="assets/img/logo-mark.svg" alt="Tôi Share Mod" width="38" height="38" />
            <span>Tôi Share Mod</span>
          </a>
          <p>Chia sẻ ứng dụng, game, file IPA và bài viết hướng dẫn cài đặt dành cho người dùng iPhone, iPad trên giao diện tối ưu cho điện thoại.</p>
          <div class="footer-stats">
            <div class="footer-stat">
              <strong>App & Game</strong>
              <span>Kho nội dung được sắp xếp rõ ràng theo từng mục.</span>
            </div>
            <div class="footer-stat">
              <strong>Blog thủ thuật</strong>
              <span>Hướng dẫn cài IPA, ký ứng dụng và mẹo sử dụng thực tế.</span>
            </div>
          </div>
        </div>

        <div class="footer-nav-block">
          <h3 class="footer-title">Truy cập nhanh</h3>
          <div class="footer-links">
            <a href="collection.html?section=featured-games">Trò chơi nổi bật</a>
            <a href="collection.html?section=featured-apps">Ứng dụng nổi bật</a>
            <a href="collection.html?section=whats-new">Có gì mới</a>
            <a href="blog.html">Blog thủ thuật</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 Tôi Share Mod. Giao diện chia sẻ nội dung, ứng dụng và hướng dẫn được cập nhật thường xuyên.</p>
      </div>
    `;
  }

  const toolsToggle = document.querySelector("[data-tools-toggle]");
  const toolsMenu = document.querySelector("[data-tools-menu]");
  const mobileMenuToggle = document.querySelector("[data-mobile-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (toolsToggle && toolsMenu) {
    toolsToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      toolsMenu.classList.toggle("open");
    });
  }

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      mobileMenuToggle.classList.toggle("active");
    });
  }

  document.addEventListener("click", (event) => {
    if (toolsMenu && toolsToggle && !toolsMenu.contains(event.target) && !toolsToggle.contains(event.target)) {
      toolsMenu.classList.remove("open");
    }

    if (mobileMenu && mobileMenuToggle && !mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
      mobileMenu.classList.remove("open");
      mobileMenuToggle.classList.remove("active");
    }
  });
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
        <a class="btn btn-primary btn-download-compact" href="download.html?id=${encodeURIComponent(app.id)}">Tải xuống</a>
      </div>
    </article>
  `;
}

function categoryIntro(type) {
  return type === "game"
    ? {
      page: "games",
      title: "Trò chơi",
      description: "Toàn bộ trò chơi được lọc riêng để người dùng điện thoại duyệt nhanh hơn.",
      lead: ""
    }
    : {
      page: "apps",
      title: "Ứng dụng",
      description: "Toàn bộ ứng dụng utility, productivity và media trong một màn hình riêng.",
      lead: ""
    };
}

function featureCardTemplate(app) {
  return `
    <article class="feature-card glass fade-up">
      <div>
        <h3 style="margin: 16px 0 8px; font-size: 1.4rem;">${escapeHTML(app.name)}</h3>
        <p>${escapeHTML(app.subtitle)}</p>
      </div>
      <div class="feature-card-foot">
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
        <img src="${post.thumbnail}" alt="${escapeHTML(post.title)}" width="640" height="360" loading="lazy" />
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
