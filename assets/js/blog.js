async function initBlogPage() {
  renderShell("blog");
  const posts = await fetchJSON("data/posts.json");
  setMeta({
    title: "Blog | Tôi Share Mod",
    description: "Danh sách bài viết về giao diện iOS 18, SEO cho GitHub Pages và cách tổ chức dữ liệu JSON cho website static.",
    image: posts[0]?.thumbnail
  });

  document.getElementById("blog-list").innerHTML = posts.map(blogCardTemplate).join("");
}

document.addEventListener("DOMContentLoaded", initBlogPage);
