# Nebula IPA

Website responsive dành cho tải ứng dụng IPA với phong cách giao diện lấy cảm hứng từ App Store/iOSGods nhưng dùng thương hiệu, logo, nội dung và dữ liệu mẫu hoàn toàn riêng.

## Công nghệ

- Next.js 15
- React 19
- TypeScript strict mode
- Tailwind CSS
- Framer Motion
- Lucide Icons
- PostgreSQL + Prisma
- App Router + Server Components

## Tính năng

- Responsive mobile first
- Dark mode
- Sticky header + sticky bottom navigation
- Trang chủ với section `Trò chơi nổi bật` và `Có gì mới`
- Trang chi tiết app với download card, timeline cài đặt, QR download, review, comment tự do
- Trang tìm kiếm có live search theo app, developer và category
- Admin dashboard với các khu vực CRUD mô phỏng
- SEO metadata, Open Graph, JSON-LD
- Loading skeleton, lazy load, dynamic import và infinite scroll

## Cấu trúc thư mục

```text
app/
components/
hooks/
lib/
services/
types/
prisma/
public/
styles/
```

## Cài đặt

1. Cài dependencies:

```bash
npm install
```

2. Tạo file môi trường:

```bash
cp .env.example .env
```

3. Khởi tạo Prisma client:

```bash
npm run db:generate
```

4. Nếu đã có PostgreSQL, đẩy schema và seed dữ liệu:

```bash
npm run db:push
npm run db:seed
```

5. Chạy môi trường development:

```bash
npm run dev
```

Mở `http://localhost:3000`.

## Lưu ý triển khai

- Font sử dụng stack `SF Pro Display` và `SF Pro Text` theo kiểu system font của Apple. Nếu máy không có font này, giao diện sẽ fallback về `-apple-system` và `Segoe UI`.
- Dữ liệu hiện tại là dữ liệu mẫu trong `services/catalog-service.ts` để website chạy được ngay cả khi chưa kết nối database.
- `prisma/schema.prisma` đã có đầy đủ bảng: `Apps`, `Categories`, `Developers`, `Versions`, `Downloads`, `Comments`, `Favorites`, `Reviews`, `News`.

## Kiểm tra chất lượng

```bash
npm run lint
npm run build
```

## Gợi ý mở rộng

- Thay dữ liệu mẫu bằng truy vấn Prisma ở `services/`
- Thêm route handlers cho comment, review, favorite và report app
- Kết nối analytics thật bằng PostgreSQL hoặc dịch vụ đo lường ngoài
