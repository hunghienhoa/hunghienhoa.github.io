async function initDownloadPage() {
  renderShell("download");
  const apps = await fetchJSON("data/apps.json");
  const appId = getParam("id") || apps[0]?.id;
  const app = apps.find((item) => item.id === appId) || apps[0];

  setMeta({
    title: `${app.name} | Tải xuống IPA`,
    description: `Tải ${app.name} phiên bản ${app.version}, xem hỗ trợ hệ điều hành, kích thước file và hướng dẫn cài đặt.`,
    image: app.icon,
    type: "article"
  });

  const root = document.getElementById("download-root");
  root.innerHTML = `
    <div class="download-grid">
      <section class="download-card glass fade-up">
        <div class="page-backbar">
          <a class="back-link" href="app.html?id=${encodeURIComponent(app.id)}">← Quay lại chi tiết</a>
        </div>
        <div class="download-head">
          <img src="${app.icon}" alt="${escapeHTML(app.name)}" width="96" height="96" />
          <div>
            <h1 class="detail-title" style="font-size:clamp(2rem,4vw,3.3rem);margin-top:10px;">${escapeHTML(app.name)}</h1>
            <p class="detail-subtitle">${escapeHTML(app.subtitle)}</p>
          </div>
        </div>
        <div class="tile-grid" style="margin-top:22px;">
          <div class="tile glass">
            <strong>v${escapeHTML(app.version)}</strong>
            <span class="muted">Phiên bản mới nhất</span>
          </div>
          <div class="tile glass">
            <strong>${escapeHTML(app.os)}</strong>
            <span class="muted">Hệ điều hành hỗ trợ</span>
          </div>
          <div class="tile glass">
            <strong>${escapeHTML(app.size)}</strong>
            <span class="muted">Kích thước file</span>
          </div>
        </div>

        <section class="section">
          <div class="section-head">
            <div>
              <h2>Tải xuống</h2>
            </div>
          </div>
          <div class="download-actions">
            <button class="btn btn-primary" id="download-button" type="button">Download IPA</button>
          </div>
          <div class="progress" aria-label="Tiến trình tải">
            <span id="progress-bar"></span>
          </div>
          <p class="download-note" id="progress-text">Sẵn sàng tải xuống.</p>
        </section>

        <section class="section">
          <div class="section-head">
            <div>
              <h2>Hướng dẫn cài đặt</h2>
            </div>
          </div>
          <div class="install-card glass">
            <ol class="install-steps">
              <li>Tải file IPA bằng nút phía trên.</li>
              <li>Mở bằng công cụ sideload như Sideloadly, AltStore hoặc giải pháp bạn hỗ trợ.</li>
              <li>Kết nối iPhone hoặc iPad, chọn file IPA và tiến hành cài.</li>
              <li>Vào Cài đặt > VPN & Quản lý thiết bị để tin cậy chứng chỉ nếu cần.</li>
            </ol>
          </div>
        </section>
      </section>

      <aside class="side-stack">
        <section class="download-card glass fade-up">
          <div class="section-head">
            <div>
              <h2>Thông tin ứng dụng</h2>
            </div>
          </div>
          <div class="listing">
            <article class="app-row glass">
              <img src="${app.icon}" alt="${escapeHTML(app.name)}" width="74" height="74" />
              <div>
                <div class="title">${escapeHTML(app.name)}</div>
                <div class="meta">${escapeHTML(app.developer)}</div>
                <div class="meta-line">
                  <span>${escapeHTML(app.updated)}</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="download-card glass fade-up">
          <div class="section-head">
            <div>
              <h2>FAQ</h2>
            </div>
          </div>
          <div class="faq-list" id="faq-list">
            ${app.faq.map((item) => `
              <article class="faq-item glass">
                <button type="button">
                  <span>${escapeHTML(item.q)}</span>
                  <span>+</span>
                </button>
                <p>${escapeHTML(item.a)}</p>
              </article>
            `).join("")}
          </div>
        </section>
      </aside>
    </div>
  `;

  initFaq(document.getElementById("faq-list"));

  const button = document.getElementById("download-button");
  const bar = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");

  button.addEventListener("click", () => {
    // popup removed

    let progress = 0;
    button.disabled = true;
    text.textContent = "Đang chuẩn bị gói IPA...";
    const timer = window.setInterval(() => {
      progress += 10;
      bar.style.width = `${progress}%`;
      text.textContent = `Đang tải... ${progress}%`;
      if (progress >= 100) {
        window.clearInterval(timer);
        text.textContent = "Hoàn tất. Đang mở liên kết tải mẫu.";
        if (window.RtdbCounters && window.RtdbCounters.isEnabled && window.RtdbCounters.isEnabled()) {
          window.RtdbCounters.incrementDownload(app.id);
        }

        if (reservedWindow && !reservedWindow.closed) {
          reservedWindow.location.href = app.downloadUrl;
        } else {
          window.location.href = app.downloadUrl;
        }

        button.disabled = false;
        setTimeout(() => {
          bar.style.width = "0%";
          text.textContent = "Sẵn sàng tải xuống.";
        }, 1500);
      }
    }, 180);
  });

  // Firebase RTDB counters (nếu cấu hình)
  if (window.RtdbCounters && window.RtdbCounters.isEnabled && window.RtdbCounters.isEnabled()) {
    window.RtdbCounters.bindCounterElements(root);
  }
}

document.addEventListener("DOMContentLoaded", initDownloadPage);
