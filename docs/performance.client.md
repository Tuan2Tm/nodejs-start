Sử dụng kỹ thuật Code Splitting và Lazy Loading

2. Tối ưu hóa các Component

3. Server-side Rendering (SSR) và Static Site Generation (SSG)

4. Pagination và Virtualized vs Memoization

- React Virtualized hoặc React Window: Chỉ render những phần tử đang hiển thị trên màn hình thay vì tất cả dữ liệu cùng một lúc. Điều này giảm đáng kể số lượng DOM nodes và cải thiện hiệu suất.

5. Tối ưu hóa hình ảnh (Image Optimization)

- Tổng kết về thời gian và performance
- Thời gian tải trang: Giảm 20-80% tùy thuộc vào số lượng hình ảnh và loại hình tối ưu hóa.
- Tốc độ phản hồi và tương tác: Cải thiện từ 1-4 giây trên các kết nối mạng chậm.
- Cải thiện điểm Lighthouse/Google PageSpeed Insights: Tăng từ 10-20 điểm đối với các trang có hình ảnh lớn.

6. So sánh giữa Local Storage và Cookie:
   | Tiêu chí | Local Storage | Cookie |
   |:---:|:---:|:---:|
   | Dung lượng lưu trữ | Lớn hơn (thường từ 5MB đến 10MB trên mỗi domain) | Nhỏ hơn, tối đa khoảng 4KB |
   | Thời gian tồn tại | Lưu trữ lâu dài, cho đến khi người dùng xóa | Có thể cài đặt thời gian hết hạn cụ thể |
   | Truy cập từ phía server | Không thể truy cập trực tiếp từ server-side | Có thể truy cập từ phía server (với HTTP headers) |
   | Truy cập từ phía client | Truy cập bằng JavaScript, dễ dàng | Truy cập bằng JavaScript, nhưng cần khai báo flag HttpOnly để ngăn truy cập từ JavaScript |
   | Bảo mật | Không có bảo mật tích hợp sẵn (không bảo vệ khỏi XSS) | Hỗ trợ bảo mật với các thuộc tính như HttpOnly, Secure, SameSite |
   | Mục đích sử dụng | Thích hợp để lưu trữ dữ liệu không nhạy cảm như settings, cache, token JWT | Thường dùng cho việc lưu trữ thông tin ngắn hạn như session ID, trạng thái đăng nhập |
   | Gửi trong request HTTP | Không tự động gửi trong mỗi request HTTP | Được gửi tự động trong mỗi request HTTP nếu không cài flag SameSite |
   | Hỗ trợ bảo mật SSL | Không hỗ trợ trực tiếp, có thể bị đánh cắp nếu XSS | Có thể chỉ định flag Secure để gửi cookie qua HTTPS |
   | Hiệu suất | Hiệu suất cao hơn, không gửi đi trong mỗi request | Có thể ảnh hưởng đến hiệu suất do được gửi kèm trong mỗi request HTTP |
   | Khả năng xóa | Người dùng hoặc mã JavaScript có thể dễ dàng xóa từng key hoặc toàn bộ | Người dùng hoặc phía server có thể xóa bằng cách đặt thời hạn là ngày trong quá khứ |
