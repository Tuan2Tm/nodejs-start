### Sử dụng kỹ thuật Code Splitting và Lazy Loading

- fonts
- videos
- metadata
- scripts
- static assets
- Analytics: su dung `{ useReportWebVitals } from 'next/web-vitals'`

### Pagination và Virtualized vs Memoization

- React Virtualized hoặc React Window: Chỉ render những phần tử đang hiển thị trên màn hình thay vì tất cả dữ liệu cùng một lúc. Điều này giảm đáng kể số lượng DOM nodes và cải thiện hiệu suất .

### Tối ưu hóa hình ảnh (Image Optimization)

- Tổng kết về thời gian và performance
- Thời gian tải trang: Giảm 20-80% tùy thuộc vào số lượng hình ảnh và loại hình tối ưu hóa.
- Tốc độ phản hồi và tương tác: Cải thiện từ 1-4 giây trên các kết nối mạng chậm.
- Cải thiện điểm Lighthouse/Google PageSpeed Insights: Tăng từ 10-20 điểm đối với các trang có hình ảnh lớn.
