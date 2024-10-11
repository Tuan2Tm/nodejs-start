### Tóm tắt luồng middleware trong Redux Thunk:

- Người dùng thực hiện hành động → React component gọi action creator.
- Action Creator trả về một hàm (thunk) → Redux Thunk Middleware thực thi hàm đó.
- Middleware thực hiện các hành động đồng bộ (ví dụ: dispatch loading) và gọi API bằng axios.
- Axios nhận kết quả từ API và dispatch các hành động dựa trên phản hồi (thành công/thất bại).
- Reducer cập nhật Redux store dựa trên loại hành động.
- React Component tự động cập nhật dựa trên thay đổi của store.

### Sự khác biệt giữa Context API và Redux?

- Mục đích sử dụng:
  - Context API: Được dùng để chia sẻ state giữa các component mà không cần phải truyền props qua nhiều cấp
  - Redux: quản lý state toàn cục trong các ứng dụng phức tạp với nhiều nguồn dữ liệu và side effects
- Cách hoạt động
  - Sử dụng khái niệm Provider để chia sẻ state đến các component con
  - State được quản lý qua store, mọi thay đổi state được thực hiện qua actions và reducers

### Khi nào sử dụng Next.js

- Next.js là lựa chọn lý tưởng cho các ứng dụng web cần tối ưu hóa SEO, hiệu suất cao, và dễ dàng triển khai.

### DOM (Document Object Model)

- là một mô hình cấu trúc của các tài liệu HTML hoặc XML, thể hiện dưới dạng cây gồm các phần tử (element) và nút (node).

### Server-side Rendering (SSR) và Static Site Generation (SSG)

- SSR là quá trình mà nội dung HTML của trang web được tạo ra trên server cho mỗi yêu cầu của người dùng. Khi người dùng gửi một yêu cầu đến server, server sẽ xử lý và gửi lại HTML đã được render sẵn cho trình duyệt.
- SSG là quá trình mà các trang HTML được tạo ra trước (tĩnh) trong quá trình xây dựng (build time) thay vì khi người dùng gửi yêu cầu. Tất cả các trang sẽ được biên dịch thành HTML tĩnh và lưu trữ trên server.

### So sánh giữa Local Storage và Cookie:

- Local Storage: lưu trữ dữ liệu lớn hơn, không cần gửi đến server
- Cookie: dữ liệu nhạy cảm như session ID hoặc token xác thực

|        Tiêu chí         |                               Local Storage                                |                                          Cookie                                           |
| :---------------------: | :------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
|   Dung lượng lưu trữ    |              Lớn hơn (thường từ 5MB đến 10MB trên mỗi domain)              |                                Nhỏ hơn, tối đa khoảng 4KB                                 |
|    Thời gian tồn tại    |                Lưu trữ lâu dài, cho đến khi người dùng xóa                 |                          Có thể cài đặt thời gian hết hạn cụ thể                          |
| Truy cập từ phía server |                Không thể truy cập trực tiếp từ server-side                 |                     Có thể truy cập từ phía server (với HTTP headers)                     |
| Truy cập từ phía client |                     Truy cập bằng JavaScript, dễ dàng                      | Truy cập bằng JavaScript, nhưng cần khai báo flag HttpOnly để ngăn truy cập từ JavaScript |
|         Bảo mật         |           Không có bảo mật tích hợp sẵn (không bảo vệ khỏi XSS)            |             Hỗ trợ bảo mật với các thuộc tính như HttpOnly, Secure, SameSite              |
|    Mục đích sử dụng     | Thích hợp để lưu trữ dữ liệu không nhạy cảm như settings, cache, token JWT |   Thường dùng cho việc lưu trữ thông tin ngắn hạn như session ID, trạng thái đăng nhập    |
| Gửi trong request HTTP  |                  Không tự động gửi trong mỗi request HTTP                  |            Được gửi tự động trong mỗi request HTTP nếu không cài flag SameSite            |
|   Hỗ trợ bảo mật SSL    |             Không hỗ trợ trực tiếp, có thể bị đánh cắp nếu XSS             |                    Có thể chỉ định flag Secure để gửi cookie qua HTTPS                    |
|        Hiệu suất        |             Hiệu suất cao hơn, không gửi đi trong mỗi request              |           Có thể ảnh hưởng đến hiệu suất do được gửi kèm trong mỗi request HTTP           |
|      Khả năng xóa       |   Người dùng hoặc mã JavaScript có thể dễ dàng xóa từng key hoặc toàn bộ   |    Người dùng hoặc phía server có thể xóa bằng cách đặt thời hạn là ngày trong quá khứ    |
