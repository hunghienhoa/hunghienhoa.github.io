// Cấu hình Firebase Realtime Database
// 1) Tạo project Firebase -> Realtime Database
// 2) Copy config web app và dán vào đây
// 3) Bật Database (test mode hoặc rules bạn tự đặt)
//
// Lưu ý: Đây là cấu hình public (client-side) nên KHÔNG chứa secret key.
// Chỉ cần apiKey / projectId / databaseURL... như Firebase cung cấp.
window.FIREBASE_CONFIG = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN",
  databaseURL: "PASTE_YOUR_DATABASE_URL",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};

