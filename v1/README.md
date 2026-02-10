# SOC Dashboard - Hệ thống Quản lý Sự cố An ninh Mạng

## Tổng quan

Đây là giao diện **SOC Dashboard** được thiết kế theo mô tả trong tài liệu đề án, kết hợp giữa Dashboard Giám sát và Kanban Board để quản lý sự cố an ninh mạng.

## Tính năng chính

### 1. Dashboard Giám sát (Monitoring View)
- **Stats Cards**: Hiển thị các chỉ số quan trọng (tấn công đang diễn ra, cảnh báo cao, lưu lượng trung bình)
- **Traffic Graph**: Biểu đồ thời gian thực với 2 đường:
  - Lưu lượng bình thường (màu xanh #52C41A)
  - Tấn công phát hiện (màu đỏ #FF4D4F)
- **System Health**: Các gauge hiển thị CPU, RAM, Network Load
- **Threat Map**: Bản đồ hiển thị nguồn tấn công theo quốc gia
- **Alerts Panel**: Panel bên phải hiển thị cảnh báo mới nhất với nút "Block IP" nhanh

### 2. Kanban Board - Quản lý Sự cố
- **4 cột trạng thái**:
  - Detected (Phát hiện) - màu đỏ
  - Investigating (Đang điều tra) - màu vàng
  - Mitigating (Đang xử lý) - màu xanh dương
  - Resolved (Đã xử lý) - màu xanh lá
- **Incident Cards** với đầy đủ thông tin:
  - Priority (P1, P2, P3)
  - Source IP, Target Port
  - Attack Type (SYN Flood, UDP Flood, etc.)
  - AI Confidence Score
  - Assignee (người xử lý)
- **Drag & Drop**: Kéo thả card giữa các cột
- **Click vào card**: Hiển thị modal chi tiết với timeline

### 3. Policy Management - Quản lý Chính sách
- **Firewall Rules**: Bảng quản lý các rule firewall với toggle on/off
- **IP Blacklist**: Danh sách IP bị chặn
- **IP Whitelist**: Danh sách IP được phép

## Đặc điểm Thiết kế

### Color Scheme (Theo yêu cầu)
- **Dark Mode**: 
  - Background primary: #121212
  - Background secondary: #1E1E2F
  - Background tertiary: #2A2A3C
- **Semantic Colors**:
  - Danger/Error: #FF4D4F (Tấn công DDoS)
  - Success: #52C41A (Hệ thống an toàn)
  - Warning: #FAAD14 (Cảnh báo)
  - Info: #1890FF (Thông tin)

### Typography
- **Font chính**: Inter (giao diện)
- **Font Monospace**: JetBrains Mono (cho IP, Log, Technical data)

### Layout
- **Hybrid Layout**: Chia màn hình thành 2 phần:
  - Monitoring panel (bên trái) - biểu đồ và giám sát
  - Alerts panel (bên phải) - cảnh báo nhanh
- **Single Page Application**: 3 views điều hướng bằng tabs
- **Responsive**: Tự động điều chỉnh trên các kích thước màn hình

## Tương tác

### Quick Actions
- **Block IP**: Nút chặn IP ngay trên alert card (không cần chuyển trang)
- **Tạo Ticket**: Tự động tạo ticket từ alert vào Kanban
- **Drag & Drop**: Kéo thả card để thay đổi trạng thái
- **Real-time Updates**: 
  - Traffic graph cập nhật mỗi 2 giây
  - System health cập nhật mỗi 3 giây
  - Simulated alerts mỗi 15 giây

### Animations & Effects
- Neon glow cho các cảnh báo quan trọng
- Pulse animation cho threat markers
- Smooth transitions
- Hover effects
- Modal slide-in animation

## Cấu trúc File

```
Do an/
├── index.html          # HTML structure
├── styles.css          # Dark mode design system
├── script.js           # Interactive functionality
├── Notes.txt           # Tài liệu yêu cầu
└── README.md           # File này
```

## Cách sử dụng

1. Mở file `index.html` trong trình duyệt
2. Điều hướng giữa 3 views:
   - **Giám sát**: Dashboard tổng quan
   - **Sự cố**: Kanban board
   - **Chính sách**: Quản lý rules và IP lists
3. Tương tác:
   - Click vào alert card để xem chi tiết
   - Click "Block IP" để chặn IP
   - Kéo thả cards trong Kanban board
   - Toggle switch để bật/tắt rules

## Công nghệ sử dụng

- **HTML5**: Semantic markup
- **CSS3**: 
  - CSS Variables (Design tokens)
  - Grid & Flexbox layout
  - CSS Animations
  - Custom scrollbars
- **JavaScript (Vanilla)**:
  - Drag & Drop API
  - Canvas API (cho biểu đồ)
  - Event handling
  - Real-time updates
  - State management

## Tích hợp AI (Mô phỏng)

Dashboard này được thiết kế để tích hợp với hệ thống AI phát hiện DDoS:

1. **Input**: AI phát hiện bất thường → Gửi alert
2. **Process**: Alert tự động tạo ticket trong Kanban (cột "Detected")
3. **Action**: Admin xử lý và kéo ticket qua các trạng thái

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Ghi chú

- Đây là prototype UI/UX, các chức năng backend cần được implement
- Dữ liệu hiện tại là mock data để demo
- Chart sử dụng Canvas API thuần túy (không dùng thư viện)
- Drag & Drop sử dụng HTML5 Drag & Drop API

## Tác giả

Đề án môn **Thiết kế giao diện người dùng**  
Học kỳ 3 - UIT

---

**Lưu ý**: Dashboard này tuân thủ 100% các yêu cầu trong Notes.txt, đặc biệt:
- ✅ Dark Mode (#121212, #1E1E2F)
- ✅ Hybrid Layout (Monitoring + Kanban)
- ✅ Quick Actions (Block IP button)
- ✅ Single Page Application
- ✅ Semantic Colors (Đỏ/Vàng/Xanh theo ý nghĩa)
- ✅ Monospace fonts cho technical data
- ✅ Kanban workflow 4 cột
- ✅ Policy Management tables
