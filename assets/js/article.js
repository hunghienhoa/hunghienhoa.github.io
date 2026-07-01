async function initArticlePage() {
  renderShell("article");
  const posts = await fetchJSON("data/posts.json");
  const articleId = getParam("id") || posts[0]?.id;
  const post = posts.find((item) => item.id === articleId) || posts[0];
  const related = posts.filter((item) => post.related.includes(item.id));

  setMeta({
    title: `${post.title} | Tôi Share Mod Blog`,
    description: post.excerpt,
    image: post.cover,
    type: "article"
  });

  const root = document.getElementById("article-root");
  root.innerHTML = `
    <article class="article">
      <div class="page-backbar">
        <a class="back-link" href="blog.html${post.category ? `?category=${encodeURIComponent(post.category)}` : ""}">← ${escapeHTML(post.category || "Blog")}</a>
      </div>
      <div class="article-cover glass fade-up" style="padding:18px;border-radius:36px;">
        <img src="${post.cover}" alt="${escapeHTML(post.title)}" width="1200" height="750" />
      </div>
      <header class="section">
        <a class="chip article-category-link" href="blog.html${post.category ? `?category=${encodeURIComponent(post.category)}` : ""}">${escapeHTML(post.category)}</a>
        <h1>${escapeHTML(post.title)}</h1>
        <p class="article-lead">${escapeHTML(post.excerpt)}</p>
        <div class="article-meta">
          <span>${escapeHTML(post.date)}</span>
          <span>${escapeHTML(post.readTime)}</span>
          <span>${escapeHTML(post.author)}</span>
        </div>
      </header>
      <section class="article-body">
        ${post.content}
      </section>
      <section class="section">
        <div class="section-head">
          <div>
            <h2>Bài viết liên quan</h2>
          </div>
        </div>
        <div class="blog-grid">
          ${related.map(blogCardTemplate).join("")}
        </div>
      </section>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", initArticlePage);
