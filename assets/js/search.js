async function initSearchPage() {
  renderShell("search");
  const apps = await fetchJSON("data/apps.json");

  setMeta({
    title: "Tìm kiếm | Tôi Share Mod",
    description: "Tìm kiếm ứng dụng và trò chơi trong một giao diện riêng tối ưu cho điện thoại.",
    image: apps[0]?.icon
  });

  const root = document.getElementById("search-root");
  root.innerHTML = `
    <section class="search-screen glass fade-up">
      <h1 class="detail-title">Tìm ứng dụng và trò chơi</h1>
      <p class="article-lead"></p>
      <label class="search-wrap glass search-screen-input" for="full-search-input">
        <span aria-hidden="true">⌕</span>
        <input id="full-search-input" type="search" placeholder="Nhập tên ứng dụng, game hoặc phiên bản..." aria-label="Tìm kiếm ứng dụng và trò chơi" />
        <span class="pill" id="full-search-count">${apps.length} kết quả</span>
      </label>
    </section>

    <section class="section">
      <div class="section-head">
        <div>
          <h2>Kết quả tìm kiếm</h2>
          <p>Kết quả sẽ tự lọc theo tên, phiên bản, mô tả và nhà phát triển.</p>
        </div>
      </div>
      <div class="listing" id="search-results"></div>
    </section>
  `;

  const input = document.getElementById("full-search-input");
  const count = document.getElementById("full-search-count");
  const results = document.getElementById("search-results");
  const pageSize = 12;
  let visible = pageSize;
  let lastFiltered = apps.slice();

  const renderResults = (keyword = "") => {
    const query = keyword.trim().toLowerCase();
    const filtered = apps.filter((app) =>
      [app.name, app.subtitle, app.version, app.category, app.developer]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
    lastFiltered = filtered;
    visible = pageSize;

    count.textContent = `${filtered.length} kết quả`;
    results.innerHTML = filtered.length
      ? filtered.slice(0, visible).map(appRowTemplate).join("")
      : `<div class="empty-state glass">Không tìm thấy kết quả phù hợp với từ khóa "${escapeHTML(keyword)}".</div>`;

    const actionHost = results.parentElement.querySelector("[data-search-actions]");
    if (actionHost) actionHost.remove();

    if (filtered.length > visible) {
      const actions = document.createElement("div");
      actions.className = "section-actions";
      actions.setAttribute("data-search-actions", "1");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-secondary";
      btn.textContent = "Xem thêm";
      btn.addEventListener("click", () => {
        visible += pageSize;
        results.innerHTML = lastFiltered.slice(0, visible).map(appRowTemplate).join("");
        if (lastFiltered.length <= visible) {
          actions.remove();
        }
        if (window.RtdbCounters && window.RtdbCounters.isEnabled && window.RtdbCounters.isEnabled()) {
          window.RtdbCounters.bindCounterElements(results);
        }
      });
      actions.appendChild(btn);
      results.parentElement.appendChild(actions);
    }

    if (window.RtdbCounters && window.RtdbCounters.isEnabled && window.RtdbCounters.isEnabled()) {
      window.RtdbCounters.bindCounterElements(results);
    }
  };

  renderResults();
  input.addEventListener("input", (event) => renderResults(event.target.value));
}

document.addEventListener("DOMContentLoaded", initSearchPage);
