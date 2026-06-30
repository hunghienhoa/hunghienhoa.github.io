# 🍏 CHÀO MỪNG ĐẾN VỚI TOISHAREMOD.IO WIKI (iOS EDITION)

<!-- Huy hiệu phong cách Apple/iOS -->
![iOS](https://img.shields.io/badge/OS-iOS%20%2F%20iPadOS-000000?style=for-the-badge&logo=apple&logoColor=white)
![Content](https://img.shields.io/badge/Content-IPA_%26_Sideload-007AFF?style=for-the-badge)
![Status](https://img.shields.io/badge/Cert-Updated-brightgreen?style=for-the-badge)

Cổng thông tin, hướng dẫn sideload và chia sẻ tệp tin **.IPA** mod bản quyền, game hack hoàn toàn miễn phí từ **Toisharemod.io**. 

> ⚠️ **Cảnh báo về Chứng Chỉ (Certificate):** Do chính sách bảo mật của Apple, các ứng dụng cài qua chứng chỉ miễn phí (Enterprise Cert) có thể bị thu hồi (Revoke) bất cứ lúc nào. Hãy theo dõi trang Wiki này hoặc kênh Telegram để cập nhật chứng chỉ mới nhất.

---

## 📂 Danh Mục Kho Tải IPA

| Danh Mục | Nội Dung Chia Sẻ | Lối Tắt |
| :--- | :--- | :--- |
| **🎮 Game iOS Mod** | Hack vô hạn tiền, Mod Menu, Hack Map, Nhìn xuyên tường... | [Khám phá →](Game-iOS-Mod) |
| **📱 App Premium** | YouTube No-Ads (uYou), Spotify Premium, TikTok Cao Cấp... | [Khám phá →](App-iOS-Premium) |
| **🛠️ Tweaks & Sideload** | Tổng hợp các công cụ hỗ trợ cài file IPA không cần Máy tính. | [Khám phá →](Huong-Dan-Esign) |

---

## 🛠️ Cẩm Nang Sideload Cho Người Mới (Không Cần Máy Tính)

Để cài đặt thành công các file IPA từ **Toisharemod.io**, bạn cần trang bị các kiến thức cơ bản sau để tránh lỗi văng app, không mở được app:

* 1️⃣ [Cách bật Chế độ nhà phát triển (Developer Mode) trên iOS 16 trở lên](Developer-Mode) *(Bắt buộc)*
* 2️⃣ [Hướng dẫn cài file IPA bằng Esign / Scarlet bằng chứng chỉ doanh nghiệp](Huong-Dan-Esign)
* 3️⃣ [Cách dùng TrollStore - Cài app vĩnh viễn không lo bị thu hồi (Dành cho máy hỗ trợ)](TrollStore-Guide)
* 4️⃣ [Làm sao để sao lưu dữ liệu game (Backup data) trước khi cập nhật bản Mod mới?](Backup-Data)

---

## ▶️ Cách Chạy Project

Đây là website tĩnh, không có bước build hay `package.json`. Bạn chỉ cần mở bằng web server local, không nên mở trực tiếp bằng `file://` vì các file JSON sẽ dễ bị lỗi.

### Chạy thường

```bash
cd /home/megumin/Documents/dev/toisharemod.github.io
python3 -m http.server 8000
```

Sau đó mở:

```text
http://localhost:8000
```

### Chạy live reload

Nếu muốn tự reload khi sửa file, dùng một trong hai cách sau:

```bash
cd /home/megumin/Documents/dev/toisharemod.github.io
npx live-server .
```

Hoặc mở thư mục project trong VS Code rồi dùng extension `Live Server` cho file [index.html](index.html).

### Lưu ý

* `assets/js/firebase-config.js` đang để placeholder, nên phần counters/realtime chỉ chạy khi bạn điền config Firebase thật.
* Nội dung chính của site nằm trong `data/apps.json` và `data/posts.json`.

---

## 🤝 Hỗ Trợ & Báo Lỗi Chứng Chỉ

Nếu gặp lỗi `Không thể xác minh ứng dụng` (App bị thu hồi), vui lòng thông báo cho đội ngũ quản trị viên tại:

* 🌐 **Website:** [Toisharemod.io](https://toisharemod.io)
* 📢 **Kênh cập nhật Chứng chỉ:** [Kênh Telegram](https://t.me/your_channels)
* 💬 **Chat với Admin:** [Group Hỗ Trợ](https://t.me/your_groups)

---

_© 2026 Toisharemod.io. Phát triển bởi cộng đồng Modder iOS Việt Nam._
