import { cache } from "react";
import type {
  AdminSection,
  AppRecord,
  Category,
  CategorySlug,
  DashboardMetric,
  Developer,
  NewsItem,
} from "@/types";

const categories: Category[] = [
  {
    id: "cat-games",
    name: "Games",
    slug: "games",
    description: "Kho game IPA nổi bật với bản dựng tối ưu cho trải nghiệm cảm giác như App Store.",
    accent: "from-sky-500 to-blue-600",
  },
  {
    id: "cat-apps",
    name: "Apps",
    slug: "apps",
    description: "Ứng dụng iOS được tinh chỉnh cho thao tác nhanh, gọn và trực quan.",
    accent: "from-violet-500 to-purple-600",
  },
  {
    id: "cat-tweaks",
    name: "Tweaks",
    slug: "tweaks",
    description: "Tiện ích mở rộng và tuỳ biến hệ thống theo phong cách hiện đại.",
    accent: "from-fuchsia-500 to-pink-600",
  },
  {
    id: "cat-utilities",
    name: "Utilities",
    slug: "utilities",
    description: "Bộ công cụ gọn nhẹ giúp tăng hiệu suất và kiểm soát thiết bị.",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: "cat-jailbreak",
    name: "Jailbreak",
    slug: "jailbreak",
    description: "Tài nguyên và hướng dẫn cài đặt cho nhóm người dùng nâng cao.",
    accent: "from-orange-500 to-amber-600",
  },
  {
    id: "cat-entertainment",
    name: "Entertainment",
    slug: "entertainment",
    description: "Giải trí, media và nội dung trực tuyến với bố cục giàu hình ảnh.",
    accent: "from-rose-500 to-red-600",
  },
  {
    id: "cat-productivity",
    name: "Productivity",
    slug: "productivity",
    description: "Ứng dụng năng suất phục vụ học tập, ghi chú và làm việc.",
    accent: "from-cyan-500 to-sky-600",
  },
  {
    id: "cat-social",
    name: "Social",
    slug: "social",
    description: "Mạng xã hội và công cụ kết nối được trình bày ưu tiên mobile.",
    accent: "from-indigo-500 to-violet-600",
  },
];

const developers: Developer[] = [
  {
    id: "dev-lumos",
    name: "Lumos Lab",
    slug: "lumos-lab",
    verified: true,
    website: "https://example.com/lumos-lab",
  },
  {
    id: "dev-orbit",
    name: "Orbit Forge",
    slug: "orbit-forge",
    verified: true,
    website: "https://example.com/orbit-forge",
  },
  {
    id: "dev-nova",
    name: "Nova Harbor",
    slug: "nova-harbor",
    verified: false,
    website: "https://example.com/nova-harbor",
  },
];

const appSeeds: AppRecord[] = [
  {
    id: "app-arcade",
    slug: "arcade-legends-ipa",
    name: "Arcade Legends",
    shortDescription: "PVP hành động tốc độ cao với giao diện tải xuống kiểu App Store.",
    description:
      "Arcade Legends là mẫu chi tiết cho game mobile với trang trình bày đậm tính editorial, khoảng trắng rộng, CTA nổi bật và flow tải IPA trực quan. Nội dung mẫu được viết mới hoàn toàn để mô phỏng một listing cao cấp, không sao chép thương hiệu hay mô tả có bản quyền.",
    category: "games",
    tags: ["Action", "Multiplayer", "Featured"],
    premium: false,
    featured: true,
    trending: true,
    rating: 4.9,
    ratingCount: 12874,
    version: "6.24.0",
    size: "142 MB",
    updatedAt: "1 tháng trước",
    views: "876.1K",
    downloads: "154.2K",
    gradient: ["#0ea5e9", "#8b5cf6"],
    iconLabel: "AL",
    developer: developers[0],
    versions: [
      {
        id: "ver-arcade-6240",
        label: "Phiên bản 6.24.0",
        iosRequirement: "iOS 13.0+",
        fileSize: "141.7 MB",
        latest: true,
        changelog: ["Tối ưu hiệu năng loading", "Cải thiện trải nghiệm sideload", "Làm mới thẻ tải xuống"],
      },
      {
        id: "ver-arcade-6230",
        label: "Phiên bản 6.23.0",
        iosRequirement: "iOS 13.0+",
        fileSize: "139.2 MB",
        latest: false,
        changelog: ["Tinh chỉnh animation", "Rút gọn thời gian khởi động"],
      },
    ],
    downloadLinks: [
      {
        id: "dl-arcade-sideloadly",
        type: "sideloadly",
        label: "Cài đặt qua Sideloadly",
        description: "Mở Sideloadly và cài IPA trực tiếp từ máy tính.",
        url: "#install-sideloadly",
      },
      {
        id: "dl-arcade-ipa",
        type: "ipa",
        label: "Tải file IPA",
        description: "Nhận file IPA để cài đặt thủ công hoặc lưu trữ.",
        url: "#download-ipa",
      },
    ],
    hackFeatures: [
      "Enemies Don't Attack",
      "No Swap Cooldown",
      "No Vanish Cooldown",
      "Unlimited Coins",
      "Unlimited Gems",
      "Always Critical",
      "Tutorial Bypassed",
    ],
    timeline: [
      {
        step: "Bước 1",
        title: "Tải tệp IPA",
        description: "Nhấn nút tải để lấy gói cài đặt mẫu đã được tối ưu trình bày.",
        icon: "download",
      },
      {
        step: "Bước 2",
        title: "Kết nối thiết bị",
        description: "Kết nối iPhone hoặc iPad với máy tính để sideload.",
        icon: "link",
      },
      {
        step: "Bước 3",
        title: "Chọn hồ sơ ký",
        description: "Mở Sideloadly, chọn file và cấu hình tài khoản ký ứng dụng.",
        icon: "shield",
      },
      {
        step: "Bước 4",
        title: "Mở ứng dụng",
        description: "Tin cậy certificate trên thiết bị và khởi chạy ứng dụng sau khi cài.",
        icon: "sparkles",
      },
    ],
    comments: [
      {
        id: "comment-arcade-1",
        author: "Minh H",
        content: "Bố cục giống App Store nhưng vẫn có cá tính riêng, phần tải xuống nhìn rất gọn.",
        timeAgo: "2 giờ trước",
        avatarColor: "from-sky-400 to-blue-500",
      },
      {
        id: "comment-arcade-2",
        author: "Thu N",
        content: "Thích nhất là card features và timeline cài đặt, đọc rất dễ hiểu trên điện thoại.",
        timeAgo: "5 giờ trước",
        avatarColor: "from-violet-400 to-fuchsia-500",
      },
    ],
    reviews: [
      {
        id: "review-arcade-1",
        author: "Hoàng",
        rating: 5,
        headline: "Trải nghiệm tải xuống cực mượt",
        content: "Trang chi tiết trông cao cấp, CTA rõ ràng và hiệu ứng chuyển động rất mềm.",
        timeAgo: "Hôm nay",
      },
      {
        id: "review-arcade-2",
        author: "Linh",
        rating: 4,
        headline: "Thiết kế sát tinh thần iOS",
        content: "Khoảng cách, màu sắc và bottom nav tạo cảm giác rất quen thuộc với người dùng iPhone.",
        timeAgo: "Hôm qua",
      },
    ],
    screenshots: ["/screen-flow.svg", "/screen-detail.svg", "/screen-search.svg"],
    compatibility: ["Không cần đăng nhập", "Hỗ trợ QR tải nhanh", "Hoạt động tốt ở dark mode"],
  },
  {
    id: "app-parking",
    slug: "city-parking-online-ipa",
    name: "City Parking Online",
    shortDescription: "Mô phỏng lái xe thành phố với chế độ multiplayer và bản dựng premium.",
    description:
      "Một listing premium dùng card lớn, gradient ấm và vùng điều hướng được tổ chức như cửa hàng ứng dụng di động hiện đại.",
    category: "games",
    tags: ["Simulation", "Driving", "Premium"],
    premium: true,
    featured: true,
    trending: false,
    rating: 4.8,
    ratingCount: 9251,
    version: "3.8.1",
    size: "286 MB",
    updatedAt: "2 tuần trước",
    views: "420.9K",
    downloads: "98.3K",
    gradient: ["#f97316", "#fb7185"],
    iconLabel: "CP",
    developer: developers[1],
    versions: [
      {
        id: "ver-park-381",
        label: "Phiên bản 3.8.1",
        iosRequirement: "iOS 14.0+",
        fileSize: "286 MB",
        latest: true,
        changelog: ["Thêm xe mới", "Tối ưu mạng multiplayer"],
      },
    ],
    downloadLinks: [
      {
        id: "dl-park-sideloadly",
        type: "sideloadly",
        label: "Cài đặt qua Sideloadly",
        description: "Sideload trực tiếp bản premium từ máy tính.",
        url: "#install-sideloadly",
      },
      {
        id: "dl-park-ipa",
        type: "ipa",
        label: "Tải file IPA",
        description: "Tải tệp IPA để cài thủ công.",
        url: "#download-ipa",
      },
    ],
    hackFeatures: [
      "Unlimited Fuel",
      "Unlimited Money",
      "Premium Garage Unlocked",
      "Fast Leveling",
      "No Ad Interruptions",
      "VIP Cars Enabled",
      "Tutorial Bypassed",
    ],
    timeline: [
      {
        step: "Bước 1",
        title: "Tải IPA",
        description: "Nhận file cài đặt để dùng với công cụ sideload.",
        icon: "download",
      },
      {
        step: "Bước 2",
        title: "Mở công cụ cài",
        description: "Chọn Sideloadly hoặc trình cài đặt khác phù hợp.",
        icon: "link",
      },
      {
        step: "Bước 3",
        title: "Ký ứng dụng",
        description: "Cấu hình tài khoản ký rồi đẩy ứng dụng lên thiết bị.",
        icon: "shield",
      },
      {
        step: "Bước 4",
        title: "Hoàn tất",
        description: "Tin cậy hồ sơ trên thiết bị và bắt đầu chơi ngay.",
        icon: "sparkles",
      },
    ],
    comments: [
      {
        id: "comment-park-1",
        author: "Phong",
        content: "Nút premium màu cam nổi bật đúng ý mình.",
        timeAgo: "3 giờ trước",
        avatarColor: "from-orange-400 to-amber-500",
      },
    ],
    reviews: [
      {
        id: "review-park-1",
        author: "Nam",
        rating: 5,
        headline: "Card premium rất bắt mắt",
        content: "Cảm giác như một landing page native hơn là website web thông thường.",
        timeAgo: "3 ngày trước",
      },
    ],
    screenshots: ["/screen-flow.svg", "/screen-search.svg"],
    compatibility: ["Premium badge", "Sticky actions", "Tối ưu mobile first"],
  },
  {
    id: "app-notebook",
    slug: "focus-notebook-ipa",
    name: "Focus Notebook",
    shortDescription: "Ứng dụng ghi chú tối giản với đồng bộ nháp, thẻ và template học tập.",
    description:
      "Mẫu listing cho nhóm năng suất với khung màu trắng, viền mờ và section 'Có gì mới' theo phong cách tạp chí số.",
    category: "productivity",
    tags: ["Notes", "Study", "Featured"],
    premium: false,
    featured: false,
    trending: true,
    rating: 4.7,
    ratingCount: 3821,
    version: "2.9.5",
    size: "88 MB",
    updatedAt: "6 ngày trước",
    views: "182.4K",
    downloads: "47.8K",
    gradient: ["#34d399", "#14b8a6"],
    iconLabel: "FN",
    developer: developers[2],
    versions: [
      {
        id: "ver-note-295",
        label: "Phiên bản 2.9.5",
        iosRequirement: "iOS 15.0+",
        fileSize: "88 MB",
        latest: true,
        changelog: ["Theme tối mới", "Tăng tốc tìm kiếm theo tag"],
      },
    ],
    downloadLinks: [
      {
        id: "dl-note-sideloadly",
        type: "sideloadly",
        label: "Cài đặt qua Sideloadly",
        description: "Cài bản IPA dành cho ghi chú nhanh và template học tập.",
        url: "#install-sideloadly",
      },
      {
        id: "dl-note-ipa",
        type: "ipa",
        label: "Tải file IPA",
        description: "Tải xuống bản ghi chú để cài thủ công.",
        url: "#download-ipa",
      },
    ],
    hackFeatures: [
      "Unlimited Notebooks",
      "Premium Templates",
      "No Export Limits",
      "AI Summary Enabled",
      "Smart Tags",
      "Unlimited Attachments",
      "Tutorial Bypassed",
    ],
    timeline: [
      {
        step: "Bước 1",
        title: "Nhận file IPA",
        description: "Lưu file IPA về máy tính hoặc thiết bị của bạn.",
        icon: "download",
      },
      {
        step: "Bước 2",
        title: "Chọn phương thức cài",
        description: "Dùng sideload hoặc lưu vào workflow riêng của bạn.",
        icon: "link",
      },
      {
        step: "Bước 3",
        title: "Tin cậy cấu hình",
        description: "Xác thực hồ sơ cài đặt trong phần quản lý thiết bị.",
        icon: "shield",
      },
      {
        step: "Bước 4",
        title: "Bắt đầu ghi chú",
        description: "Mở app và trải nghiệm giao diện sáng tối mượt mà.",
        icon: "sparkles",
      },
    ],
    comments: [
      {
        id: "comment-note-1",
        author: "Hà My",
        content: "Search theo developer và category phản hồi nhanh, rất thích.",
        timeAgo: "1 ngày trước",
        avatarColor: "from-emerald-400 to-teal-500",
      },
    ],
    reviews: [
      {
        id: "review-note-1",
        author: "Vũ",
        rating: 4,
        headline: "Rất hợp làm kho IPA cho ứng dụng",
        content: "Khác game ở chỗ màu sắc dịu hơn nhưng vẫn giữ nguyên ngôn ngữ thiết kế tổng thể.",
        timeAgo: "2 ngày trước",
      },
    ],
    screenshots: ["/screen-detail.svg", "/screen-search.svg"],
    compatibility: ["Dark mode", "Live search", "Bookmark cục bộ"],
  },
  {
    id: "app-pulse",
    slug: "pulse-chat-ipa",
    name: "Pulse Chat",
    shortDescription: "Ứng dụng social với hồ sơ đẹp, hiệu ứng motion và trải nghiệm giống native.",
    description:
      "Pulse Chat đại diện cho nhóm Social với nhịp điệu màu sắc tím xanh, card bình luận lớn và CTA download cân đối.",
    category: "social",
    tags: ["Social", "Messaging", "New"],
    premium: false,
    featured: false,
    trending: true,
    rating: 4.6,
    ratingCount: 1940,
    version: "5.4.2",
    size: "122 MB",
    updatedAt: "3 ngày trước",
    views: "96.8K",
    downloads: "22.5K",
    gradient: ["#6366f1", "#22c55e"],
    iconLabel: "PC",
    developer: developers[0],
    versions: [
      {
        id: "ver-pulse-542",
        label: "Phiên bản 5.4.2",
        iosRequirement: "iOS 14.0+",
        fileSize: "122 MB",
        latest: true,
        changelog: ["Avatar gradient mới", "Feed nhanh hơn", "Bản xem trước link tốt hơn"],
      },
    ],
    downloadLinks: [
      {
        id: "dl-pulse-sideloadly",
        type: "sideloadly",
        label: "Cài đặt qua Sideloadly",
        description: "Cài IPA social ngay từ máy tính của bạn.",
        url: "#install-sideloadly",
      },
      {
        id: "dl-pulse-ipa",
        type: "ipa",
        label: "Tải file IPA",
        description: "Tải gói IPA thủ công để chia sẻ hoặc lưu trữ.",
        url: "#download-ipa",
      },
    ],
    hackFeatures: [
      "Unlocked Themes",
      "No Story Cooldown",
      "Extended Upload Limit",
      "Profile Effects",
      "Unlimited Reactions",
      "Priority Uploads",
      "Tutorial Bypassed",
    ],
    timeline: [
      {
        step: "Bước 1",
        title: "Lấy IPA",
        description: "Nhấn tải để nhận gói social build.",
        icon: "download",
      },
      {
        step: "Bước 2",
        title: "Chuẩn bị công cụ",
        description: "Mở phần mềm cài IPA trên máy tính.",
        icon: "link",
      },
      {
        step: "Bước 3",
        title: "Đẩy lên thiết bị",
        description: "Chọn file và tiến hành ký cài đặt.",
        icon: "shield",
      },
      {
        step: "Bước 4",
        title: "Khởi chạy",
        description: "Mở app và trải nghiệm giao diện được tối ưu cho dark mode.",
        icon: "sparkles",
      },
    ],
    comments: [],
    reviews: [],
    screenshots: ["/screen-search.svg", "/screen-detail.svg"],
    compatibility: ["Live comments", "Open Graph ready", "Animation mượt"],
  },
  {
    id: "app-aura",
    slug: "aura-studio-ipa",
    name: "Aura Studio",
    shortDescription: "Bộ công cụ chỉnh ảnh và video với preset màu, template và xuất nhanh.",
    description:
      "Aura Studio đại diện cho nhóm Apps với nhấn mạnh vào card trắng, vùng blur và thanh thao tác nổi như ứng dụng native của hệ sinh thái iOS.",
    category: "apps",
    tags: ["Editor", "Media", "Popular"],
    premium: false,
    featured: false,
    trending: true,
    rating: 4.8,
    ratingCount: 6450,
    version: "4.2.1",
    size: "156 MB",
    updatedAt: "4 ngày trước",
    views: "214.6K",
    downloads: "63.9K",
    gradient: ["#38bdf8", "#818cf8"],
    iconLabel: "AS",
    developer: developers[1],
    versions: [
      {
        id: "ver-aura-421",
        label: "Phiên bản 4.2.1",
        iosRequirement: "iOS 15.0+",
        fileSize: "156 MB",
        latest: true,
        changelog: ["Preset mới", "Render nhanh hơn", "Giao diện export gọn hơn"],
      },
    ],
    downloadLinks: [
      {
        id: "dl-aura-sideloadly",
        type: "sideloadly",
        label: "Cài đặt qua Sideloadly",
        description: "Cài bộ công cụ media từ máy tính.",
        url: "#install-sideloadly",
      },
      {
        id: "dl-aura-ipa",
        type: "ipa",
        label: "Tải file IPA",
        description: "Nhận gói cài để sideload thủ công.",
        url: "#download-ipa",
      },
    ],
    hackFeatures: [
      "Premium Filters",
      "No Watermark",
      "Unlimited Export",
      "Template Pack",
      "AI Cutout",
      "Color LUT Library",
      "Tutorial Bypassed",
    ],
    timeline: [
      { step: "Bước 1", title: "Tải IPA", description: "Nhận bộ cài media để sideload.", icon: "download" },
      { step: "Bước 2", title: "Mở công cụ cài", description: "Chuẩn bị Sideloadly hoặc workflow tương đương.", icon: "link" },
      { step: "Bước 3", title: "Ký ứng dụng", description: "Chọn file IPA và ký lên thiết bị iOS.", icon: "shield" },
      { step: "Bước 4", title: "Bắt đầu chỉnh sửa", description: "Mở app và trải nghiệm giao diện tối ưu cho mobile.", icon: "sparkles" },
    ],
    comments: [
      {
        id: "comment-aura-1",
        author: "Uyên",
        content: "Category Apps giờ nhìn đầy đặn hơn, đúng chất kho ứng dụng.",
        timeAgo: "7 giờ trước",
        avatarColor: "from-cyan-400 to-indigo-500",
      },
    ],
    reviews: [],
    screenshots: ["/screen-flow.svg", "/screen-search.svg"],
    compatibility: ["Media workflows", "Dark mode", "Responsive"],
  },
  {
    id: "app-quicktools",
    slug: "quicktools-utility-ipa",
    name: "QuickTools Utility",
    shortDescription: "Gói tiện ích đa năng cho file, clipboard, QR và quản lý thiết bị.",
    description:
      "QuickTools là ứng dụng utility mẫu để nhóm danh mục công cụ có nội dung thực tế, đồng thời chứng minh cấu trúc component có thể tái sử dụng cho nhiều loại listing.",
    category: "utilities",
    tags: ["Utility", "Tools", "New"],
    premium: false,
    featured: false,
    trending: false,
    rating: 4.5,
    ratingCount: 2145,
    version: "1.8.0",
    size: "54 MB",
    updatedAt: "1 tuần trước",
    views: "58.4K",
    downloads: "17.2K",
    gradient: ["#22c55e", "#14b8a6"],
    iconLabel: "QT",
    developer: developers[2],
    versions: [
      {
        id: "ver-qt-180",
        label: "Phiên bản 1.8.0",
        iosRequirement: "iOS 15.0+",
        fileSize: "54 MB",
        latest: true,
        changelog: ["Thêm bộ quét QR", "Tinh chỉnh chia sẻ file"],
      },
    ],
    downloadLinks: [
      {
        id: "dl-qt-sideloadly",
        type: "sideloadly",
        label: "Cài đặt qua Sideloadly",
        description: "Cài utility package bằng sideload.",
        url: "#install-sideloadly",
      },
      {
        id: "dl-qt-ipa",
        type: "ipa",
        label: "Tải file IPA",
        description: "Tải gói IPA để lưu trữ hoặc cài thủ công.",
        url: "#download-ipa",
      },
    ],
    hackFeatures: [
      "Unlimited Scans",
      "Clipboard History",
      "Export Without Limits",
      "Premium Widgets",
      "No Ads",
      "Shortcut Packs",
      "Tutorial Bypassed",
    ],
    timeline: [
      { step: "Bước 1", title: "Nhận file IPA", description: "Tải utility pack về máy.", icon: "download" },
      { step: "Bước 2", title: "Chuẩn bị sideload", description: "Mở công cụ cài IPA.", icon: "link" },
      { step: "Bước 3", title: "Cấp quyền cần thiết", description: "Cấu hình hồ sơ và quyền chia sẻ file.", icon: "shield" },
      { step: "Bước 4", title: "Dùng ngay", description: "Khởi chạy để truy cập bộ tiện ích nhanh.", icon: "sparkles" },
    ],
    comments: [],
    reviews: [],
    screenshots: ["/screen-search.svg"],
    compatibility: ["Utility panel", "Share sheet", "QR helper"],
  },
];

const newsFeed: NewsItem[] = [
  {
    id: "news-1",
    title: "Thiết kế card tải IPA đã được làm mới với vùng blur và CTA lớn hơn",
    excerpt: "Bản dựng mẫu tăng độ rõ của nút cài đặt và phần timeline hướng dẫn.",
    timeAgo: "Hôm nay",
  },
  {
    id: "news-2",
    title: "Bottom navigation được tối ưu cho thao tác một tay trên màn hình nhỏ",
    excerpt: "Khoảng cách chạm, icon và nhịp chữ được cân lại theo hướng App Store.",
    timeAgo: "Hôm qua",
  },
];

const adminSections: AdminSection[] = [
  { slug: "apps", title: "CRUD Apps", description: "Quản lý danh sách ứng dụng, metadata, icon và trạng thái hiển thị." },
  { slug: "categories", title: "CRUD Categories", description: "Quản lý nhóm danh mục và màu accent cho từng section." },
  { slug: "developers", title: "CRUD Developers", description: "Theo dõi developer, website và trạng thái xác minh." },
  { slug: "versions", title: "CRUD Versions", description: "Quản lý version, yêu cầu iOS và changelog phát hành." },
  { slug: "downloads", title: "CRUD Downloads", description: "Theo dõi liên kết tải, sideload và bộ đếm download." },
  { slug: "comments", title: "CRUD Comments", description: "Duyệt bình luận tự do, report và kiểm soát nội dung nổi bật." },
  { slug: "banner", title: "Banner", description: "Sắp xếp hero banner, spotlight và card marketing trên trang chủ." },
  { slug: "featured", title: "Featured Apps", description: "Điều khiển nhóm trò chơi nổi bật và vị trí xuất hiện đầu trang." },
  { slug: "trending", title: "Trending Apps", description: "Quản lý ứng dụng đang tăng lượt xem và đề xuất nhanh." },
  { slug: "analytics", title: "Analytics", description: "Xem thống kê view, download, rating và tương tác của người dùng." },
];

const dashboardMetrics: DashboardMetric[] = [
  { id: "metric-apps", label: "Ứng dụng", value: "128", trend: "+12.4%" },
  { id: "metric-downloads", label: "Tải xuống", value: "1.2M", trend: "+8.1%" },
  { id: "metric-comments", label: "Bình luận", value: "18.4K", trend: "+5.7%" },
  { id: "metric-rating", label: "Điểm trung bình", value: "4.8", trend: "+0.2" },
];

export const getCategories = cache(async () => categories);

export const getDevelopers = cache(async () => developers);

export const getAllApps = cache(async () => appSeeds);

export const getFeaturedApps = cache(async () => appSeeds.filter((app) => app.featured));

export const getTrendingApps = cache(async () => appSeeds.filter((app) => app.trending));

export const getNewApps = cache(async () =>
  [...appSeeds].sort((left, right) => right.ratingCount - left.ratingCount).slice(0, 4),
);

export const getAppBySlug = cache(async (slug: string) => appSeeds.find((app) => app.slug === slug) ?? null);

export const getAppsByCategory = cache(async (slug: CategorySlug) => appSeeds.filter((app) => app.category === slug));

export const searchApps = cache(async (query: string) => {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return appSeeds;
  }

  return appSeeds.filter((app) => {
    const developerName = app.developer.name.toLowerCase();
    const categoryName = app.category.toLowerCase();
    const haystack = `${app.name} ${app.shortDescription} ${developerName} ${categoryName} ${app.tags.join(" ")}`.toLowerCase();
    return haystack.includes(normalized);
  });
});

export const getNewsFeed = cache(async () => newsFeed);

export const getAdminSections = cache(async () => adminSections);

export const getAdminSection = cache(async (slug: string) => adminSections.find((section) => section.slug === slug) ?? null);

export const getDashboardMetrics = cache(async () => dashboardMetrics);

export const getRelatedApps = cache(async (slug: string, category: CategorySlug) =>
  appSeeds.filter((app) => app.slug !== slug && app.category === category).slice(0, 3),
);
