async function initAppPage() {
  renderShell("app");
  const apps = await fetchJSON("data/apps.json");
  const appId = getParam("id") || apps[0]?.id;
  const app = apps.find((item) => item.id === appId) || apps[0];
  const related = apps.filter((item) => item.id !== app.id && item.category === app.category).slice(0, 3);

  setMeta({
    title: `${app.name} | Chi tiết ứng dụng`,
    description: app.description,
    image: app.icon,
    type: "article"
  });

  const root = document.getElementById("app-root");
  root.innerHTML = `
    <div class="detail-grid">
      <section class="detail-card glass fade-up">
        <div class="detail-head">
          <img src="${app.icon}" alt="${escapeHTML(app.name)}" width="112" height="112" />
          <div>
            <span class="chip">${escapeHTML(app.badge)}</span>
            <h1 class="detail-title">${escapeHTML(app.name)}</h1>
            <p class="detail-subtitle">${escapeHTML(app.subtitle)}</p>
            <div class="detail-actions">
              <a class="btn btn-primary" href="download.html?id=${encodeURIComponent(app.id)}">Tải xuống</a>
            </div>
          </div>
        </div>
        <div class="stat-grid app-stat-row" style="margin-top:22px;">
          <div class="stat-card glass">
            <strong>${escapeHTML(app.version)}</strong>
            <span class="muted">Phiên bản</span>
          </div>
          <div class="stat-card glass">
            <strong>${escapeHTML(app.updated)}</strong>
            <span class="muted">Ngày cập nhật</span>
          </div>
          <div class="stat-card glass">
            <strong>${escapeHTML(app.views)}</strong>
            <span class="muted">Lượt xem</span>
          </div>
        </div>

        <section class="section">
          <div class="section-head">
            <div>
              <h2>Thông tin nhanh</h2>
            </div>
          </div>
          <div class="content-block glass">
            <div class="mini-grid">
              <div class="mini-stat glass">
                <strong>${escapeHTML(app.size)}</strong>
                <span class="muted">Kích thước</span>
              </div>
              <div class="mini-stat glass">
                <strong>${escapeHTML(app.os)}</strong>
                <span class="muted">Hỗ trợ</span>
              </div>
              <div class="mini-stat glass">
                <strong>${escapeHTML(app.support)}</strong>
                <span class="muted">Cài đặt</span>
              </div>
              <div class="mini-stat glass">
                <strong>${escapeHTML(app.rating)}</strong>
                <span class="muted">Đánh giá</span>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <div>
              <h2>Tính năng</h2>
            </div>
          </div>
          <div class="content-block glass">
            <ul class="feature-list">
              ${app.features.map((feature) => `<li>${escapeHTML(feature)}</li>`).join("")}
            </ul>
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <div>
              <h2>Mô tả ứng dụng</h2>
            </div>
          </div>
          <div class="content-block glass">
            <p class="article-lead">${escapeHTML(app.description)}</p>
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <div>
              <h2>Ảnh chụp màn hình</h2>
              <p>Kéo ngang hoặc dùng nút điều khiển để xem thêm.</p>
            </div>
          </div>
          <div class="slider-shell content-block glass">
            <div class="slider-controls">
              <button type="button" data-slide="-1" aria-label="Trước">←</button>
              <button type="button" data-slide="1" aria-label="Sau">→</button>
            </div>
            <div class="slider-track" id="screenshot-track">
              ${app.screenshots.map((src, index) => `<img src="${src}" alt="${escapeHTML(app.name)} screenshot ${index + 1}" width="340" height="736" loading="lazy" />`).join("")}
            </div>
          </div>
        </section>
      </section>

      <aside class="side-stack">
        <section class="detail-card glass fade-up">
          <div class="section-head">
            <div>
              <h2>Ứng dụng liên quan</h2>
            </div>
          </div>
          <div class="listing">
            ${related.map(appRowTemplate).join("")}
          </div>
        </section>
      </aside>
    </div>
  `;

  const track = document.getElementById("screenshot-track");
  root.querySelectorAll("[data-slide]").forEach((button) => {
    button.addEventListener("click", () => {
      const direction = Number(button.dataset.slide || 1);
      track.scrollBy({ left: direction * 320, behavior: "smooth" });
    });
  });
}

document.addEventListener("DOMContentLoaded", initAppPage);
