async function initBlogPage() {
  renderShell("blog");
  const posts = await fetchJSON("data/posts.json");
  const currentCategory = getParam("category");
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))];
  const filteredPosts = currentCategory
    ? posts.filter((post) => post.category === currentCategory)
    : posts;
  setMeta({
    title: currentCategory ? `${currentCategory} | Blog | Tôi Share Mod` : "Blog | Tôi Share Mod",
    description: currentCategory
      ? `Danh sách bài viết thuộc danh mục ${currentCategory} trên Tôi Share Mod.`
      : "Danh sách bài viết về giao diện iOS 18, SEO cho GitHub Pages và cách tổ chức dữ liệu JSON cho website static.",
    image: filteredPosts[0]?.thumbnail || posts[0]?.thumbnail
  });

  document.getElementById("blog-summary").innerHTML = `
    <div class="mini-stat glass">
      <strong>${filteredPosts.length}</strong>
      <span class="muted">${currentCategory ? "Bài viết trong mục" : "Tổng bài viết"}</span>
    </div>
    <div class="mini-stat glass">
      <strong>${categories.length}</strong>
      <span class="muted">Danh mục</span>
    </div>
  `;

  document.getElementById("blog-filters").innerHTML = [
    `<a class="chip-action ${!currentCategory ? "active" : ""}" href="blog.html">Tất cả</a>`,
    ...categories.map((category) => `
      <a class="chip-action ${currentCategory === category ? "active" : ""}" href="blog.html?category=${encodeURIComponent(category)}">
        ${escapeHTML(category)}
      </a>
    `)
  ].join("");

  const list = document.getElementById("blog-list");
  list.innerHTML = filteredPosts.length
    ? filteredPosts.map(blogCardTemplate).join("")
    : `<div class="empty-state glass">Chưa có bài viết trong danh mục này.</div>`;
}

document.addEventListener("DOMContentLoaded", initBlogPage);
