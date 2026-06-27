import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.download.deleteMany();
  await prisma.version.deleteMany();
  await prisma.app.deleteMany();
  await prisma.developer.deleteMany();
  await prisma.category.deleteMany();
  await prisma.news.deleteMany();

  const categories = await prisma.category.createMany({
    data: [
      { name: "Games", slug: "games", description: "Kho game IPA nổi bật.", accent: "from-sky-500 to-blue-600" },
      { name: "Apps", slug: "apps", description: "Ứng dụng iOS với giao diện hiện đại.", accent: "from-violet-500 to-purple-600" },
      { name: "Tweaks", slug: "tweaks", description: "Tiện ích mở rộng.", accent: "from-fuchsia-500 to-pink-600" },
      { name: "Utilities", slug: "utilities", description: "Công cụ tăng hiệu suất.", accent: "from-emerald-500 to-teal-600" },
      { name: "Jailbreak", slug: "jailbreak", description: "Tài nguyên nâng cao.", accent: "from-orange-500 to-amber-600" },
      { name: "Entertainment", slug: "entertainment", description: "Media và giải trí.", accent: "from-rose-500 to-red-600" },
      { name: "Productivity", slug: "productivity", description: "Ứng dụng năng suất.", accent: "from-cyan-500 to-sky-600" },
      { name: "Social", slug: "social", description: "Mạng xã hội.", accent: "from-indigo-500 to-violet-600" },
    ],
  });

  const lumos = await prisma.developer.create({
    data: { name: "Lumos Lab", slug: "lumos-lab", verified: true, website: "https://example.com/lumos-lab" },
  });

  const orbit = await prisma.developer.create({
    data: { name: "Orbit Forge", slug: "orbit-forge", verified: true, website: "https://example.com/orbit-forge" },
  });

  const arcade = await prisma.app.create({
    data: {
      slug: "arcade-legends-ipa",
      name: "Arcade Legends",
      shortDescription: "PVP hành động tốc độ cao với giao diện tải xuống kiểu App Store.",
      description: "Dữ liệu seed mẫu cho website IPA với bố cục hiện đại, CTA rõ ràng và section tải xuống chi tiết.",
      categorySlug: "games",
      premium: false,
      featured: true,
      trending: true,
      rating: 4.9,
      ratingCount: 12874,
      version: "6.24.0",
      size: "142 MB",
      updatedAtLabel: "1 tháng trước",
      viewsLabel: "876.1K",
      downloadsLabel: "154.2K",
      iconLabel: "AL",
      gradientStart: "#0ea5e9",
      gradientEnd: "#8b5cf6",
      tags: ["Action", "Multiplayer", "Featured"],
      screenshots: ["/screen-flow.svg", "/screen-detail.svg", "/screen-search.svg"],
      compatibility: ["Không cần đăng nhập", "Hỗ trợ QR tải nhanh", "Hoạt động tốt ở dark mode"],
      hackFeatures: [
        "Enemies Don't Attack",
        "No Swap Cooldown",
        "No Vanish Cooldown",
        "Unlimited Coins",
        "Unlimited Gems",
        "Always Critical",
        "Tutorial Bypassed",
      ],
      developerId: lumos.id,
      versions: {
        create: [
          {
            label: "Phiên bản 6.24.0",
            iosRequirement: "iOS 13.0+",
            fileSize: "141.7 MB",
            latest: true,
            changelog: ["Tối ưu hiệu năng loading", "Cải thiện trải nghiệm sideload", "Làm mới thẻ tải xuống"],
          },
        ],
      },
      downloads: {
        create: [
          {
            type: "sideloadly",
            label: "Cài đặt qua Sideloadly",
            description: "Mở Sideloadly và cài IPA trực tiếp từ máy tính.",
            url: "#install-sideloadly",
            count: 154200,
          },
          {
            type: "ipa",
            label: "Tải file IPA",
            description: "Nhận file IPA để cài đặt thủ công hoặc lưu trữ.",
            url: "#download-ipa",
            count: 154200,
          },
        ],
      },
      comments: {
        create: [
          {
            author: "Minh H",
            content: "Bố cục giống App Store nhưng vẫn có cá tính riêng.",
            timeAgo: "2 giờ trước",
            avatarColor: "from-sky-400 to-blue-500",
          },
        ],
      },
      reviews: {
        create: [
          {
            author: "Hoàng",
            rating: 5,
            headline: "Trải nghiệm tải xuống cực mượt",
            content: "Trang chi tiết trông cao cấp, CTA rõ ràng và hiệu ứng chuyển động rất mềm.",
            timeAgo: "Hôm nay",
          },
        ],
      },
    },
  });

  await prisma.app.create({
    data: {
      slug: "city-parking-online-ipa",
      name: "City Parking Online",
      shortDescription: "Mô phỏng lái xe thành phố với chế độ multiplayer và bản dựng premium.",
      description: "Dữ liệu mẫu cho ứng dụng premium với tông cam và CTA nổi bật.",
      categorySlug: "games",
      premium: true,
      featured: true,
      trending: false,
      rating: 4.8,
      ratingCount: 9251,
      version: "3.8.1",
      size: "286 MB",
      updatedAtLabel: "2 tuần trước",
      viewsLabel: "420.9K",
      downloadsLabel: "98.3K",
      iconLabel: "CP",
      gradientStart: "#f97316",
      gradientEnd: "#fb7185",
      tags: ["Simulation", "Driving", "Premium"],
      screenshots: ["/screen-flow.svg", "/screen-search.svg"],
      compatibility: ["Premium badge", "Sticky actions", "Tối ưu mobile first"],
      hackFeatures: ["Unlimited Fuel", "Unlimited Money", "Premium Garage Unlocked"],
      developerId: orbit.id,
      versions: {
        create: [{ label: "Phiên bản 3.8.1", iosRequirement: "iOS 14.0+", fileSize: "286 MB", latest: true, changelog: ["Thêm xe mới"] }],
      },
      downloads: {
        create: [{ type: "ipa", label: "Tải file IPA", description: "Tải tệp IPA để cài thủ công.", url: "#download-ipa", count: 98300 }],
      },
    },
  });

  await prisma.news.createMany({
    data: [
      {
        title: "Thiết kế card tải IPA đã được làm mới với vùng blur và CTA lớn hơn",
        excerpt: "Bản dựng mẫu tăng độ rõ của nút cài đặt và phần timeline hướng dẫn.",
        timeAgo: "Hôm nay",
      },
      {
        title: "Bottom navigation được tối ưu cho thao tác một tay trên màn hình nhỏ",
        excerpt: "Khoảng cách chạm, icon và nhịp chữ được cân lại theo hướng App Store.",
        timeAgo: "Hôm qua",
      },
    ],
  });

  console.log("Seeded apps:", { categories: categories.count, primaryApp: arcade.slug });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
