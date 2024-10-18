### Cau hoi phong van co ban nodejs

---

### Node.js là gì? Tại sao chọn Node.js?

- Node.js là một runtime JavaScript dựa trên V8 engine của Chrome, cho phép chạy JavaScript trên máy chủ (server-side).
- Lý do chọn Node.js:

  - Non-blocking I/O giúp xử lý nhiều yêu cầu đồng thời hiệu quả.
  - Single-threaded nhưng sử dụng event loop để quản lý các tác vụ I/O không đồng bộ.
  - Thích hợp cho các ứng dụng thời gian thực, như chat, game trực tuyến, hoặc các ứng dụng cần nhiều kết nối đồng thời.

### Event Loop trong Node.js là gì?

- Event Loop là một cơ chế giúp Node.js xử lý các yêu cầu không đồng bộ. Nó cho phép Node.js thực thi code không chặn (non-blocking), giúp xử lý nhiều yêu cầu cùng lúc mà không cần tạo nhiều luồng (single-threaded).

### Khái Niệm IO Non-Blocking, Callback,

- IO Blocking: Khi một tác vụ IO (như đọc từ tệp hoặc mạng) đang thực hiện, luồng thực thi sẽ bị tạm dừng cho đến khi tác vụ hoàn tất. Điều này có thể dẫn đến tình trạng chậm trễ và hiệu suất kém trong các ứng dụng cần xử lý nhiều kết nối hoặc yêu cầu.

- IO Non-Blocking: trong IO non-blocking, luồng không bị tạm dừng trong khi chờ kết quả của tác vụ IO. Thay vào đó, nó sẽ tiếp tục thực hiện các tác vụ khác và kiểm tra kết quả của tác vụ IO khi có thể.

- Callback là một hàm được truyền vào một hàm khác như một đối số và sẽ được gọi sau khi hàm đó hoàn thành công việc.

- Callback Queue (hàng đợi callback) là một hàng đợi lưu trữ các hàm callback sẽ được thực thi sau khi các tác vụ không đồng bộ (như I/O, setTimeout, hay các sự kiện) hoàn thành. Khi một tác vụ không đồng bộ hoàn thành, callback tương ứng của nó sẽ được đẩy vào callback queue và sau đó được thực thi bởi Event Loop khi call stack (ngăn xếp lời gọi) rỗng.

- Promises và Async/Await: Trong JavaScript, bạn cũng có thể sử dụng promises hoặc async/await để làm việc với IO non-blocking một cách dễ dàng hơn.

### Các phương pháp tối ưu hệ thống backend

1. Tối ưu hóa cơ sở dữ liệu

- Sử dụng indexs

  - Mục đích: Tăng tốc độ truy vấn cơ sở dữ liệu bằng cách lập chỉ mục các cột được tìm kiếm thường xuyên.
  - Lưu ý: Tránh lập quá nhiều index vì điều này có thể làm giảm hiệu suất khi thực hiện ghi dữ liệu (INSERT/UPDATE/DELETE).

- Tối ưu hóa truy vấn
- Sharding và Partitioning

  - Sharding: Phân chia dữ liệu thành các phần nhỏ để lưu trữ trên nhiều cơ sở dữ liệu hoặc server khác nhau.
  - Partitioning: Phân chia một bảng lớn thành các phần nhỏ hơn để tăng tốc độ truy vấn.

- Load Balancer: là một hệ thống hoặc kỹ thuật phân phối đều lưu lượng truy cập
- Message Queue: Chuyển các tác vụ nặng (như gửi email, xử lý file, v.v.) vào hàng đợi để thực thi không đồng bộ

### Streams, Buffer, Middleware, Event emitter

- Streams: Làm việc với dữ liệu không hoàn chỉnh (chunks). Có bốn loại streams: Readable (dữ liệu có thể đọc), Writable (dữ liệu có thể ghi), Duplex (vừa đọc vừa ghi), và Transform (dữ liệu được chuyển đổi trong quá trình stream).

- Buffer: Là một không gian bộ nhớ tạm thời chứa dữ liệu nhị phân. Node.js sử dụng Buffer để xử lý dữ liệu I/O một cách hiệu quả.

- Middleware: Là hàm trung gian xử lý yêu cầu và phản hồi giữa client và server. Mỗi middleware có thể thay đổi yêu cầu hoặc phản hồi, hoặc kết thúc chuỗi xử lý. Nó giúp kiểm soát các thao tác như xác thực, ghi log, và xử lý lỗi. 4. tham tri: value type: string number boolean, bigInt, symbol, undefined, null; tham chieu: Reference Types: object, array, func

- Event emitter: Một đối tượng cho phép các đối tượng khác đăng ký để lắng nghe các sự kiện.

### Tại sao chúng ta cần đánh index trong MongoDB và MySQL?

- Index là một cấu trúc dữ liệu giúp tăng tốc quá trình truy vấn bằng cách tìm kiếm nhanh hơn trong cơ sở dữ liệu.
- Khi nào sử dụng: Khi bạn cần tìm kiếm nhanh trên các cột hay trường có nhiều bản ghi. Index giúp cải thiện hiệu suất truy vấn khi bạn có nhiều dữ liệu hoặc thực hiện các truy vấn tìm kiếm phức tạp.
- Tối ưu: Đánh index có thể làm chậm quá trình ghi dữ liệu (INSERT, UPDATE, DELETE), vì thế chỉ nên đánh index cho các trường thường xuyên truy vấn.

### Tối ưu hóa truy vấn cơ sở dữ liệu trong Node.js?

- **Sử dụng index**: trên các trường dữ liệu truy vấn thường xuyên.
- **Giới hạn lượng dữ liệu trả về**: với LIMIT (MySQL) hoặc skip và limit (MongoDB).
- **Pagination**: Thay vì trả toàn bộ dữ liệu, chỉ trả về một phần với phân trang.
- **Redis caching**: Sử dụng Redis để cache kết quả truy vấn giúp giảm tải cho cơ sở dữ liệu.

### Làm thế nào để scale một ứng dụng Node.js?

- Cluster: Tạo ra nhiều worker để xử lý các yêu cầu song song.

  - Cluster cho phép bạn sử dụng nhiều worker processes để chia sẻ tải trên cùng một cổng mạng (port). Node.js hoạt động đơn luồng, nhưng với Cluster bạn có thể tạo ra các bản sao worker của ứng dụng để tận dụng CPU đa lõi và xử lý nhiều yêu cầu đồng thời

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end('Hello world\n');
    })
    .listen(8000);
}
```

- Load Balancer: Sử dụng load balancer để phân phối tải giữa nhiều instance.
- Caching: Sử dụng Redis hoặc Memcached để giảm thiểu truy vấn tới cơ sở dữ liệu.
- Horizontal Scaling: Thêm nhiều máy chủ để xử lý tải lớn hơn (ngược lại với Vertical Scaling là tăng cấu hình máy chủ hiện tại).

### Sự khác nhau giữa NoSQL (MongoDB) và SQL (MySQL)?

- !NoSQL (MongoDB): Lưu trữ dữ liệu dạng document (JSON-like), linh hoạt và không yêu cầu schema chặt chẽ. Thích hợp cho dữ liệu phi cấu trúc, ứng dụng thời gian thực.
- !SQL (MySQL): Lưu trữ dữ liệu dạng bảng với các mối quan hệ phức tạp, sử dụng schema rõ ràng. Phù hợp cho các hệ thống yêu cầu dữ liệu có cấu trúc và mối quan hệ chặt chẽ.

### EventEmitter trong Node.js

- **EventEmitter** là một lớp trong module events của Node.js, cung cấp khả năng tạo và xử lý các sự kiện tùy chỉnh.

---

### Redis (Remote Dictionary Server) là một cơ sở dữ liệu lưu trữ key-value dạng in-memory, giúp truy cập dữ liệu nhanh hơn

- Kiểu dữ liệu redis: string, list, set, sorted set, hash, Bitmaps, HyperLogLog, Streams

  - String: Chuỗi đơn giản.
  - List: Danh sách các chuỗi theo thứ tự.
  - Set: Tập hợp các chuỗi không trùng lặp.
  - Sorted Set: Tập hợp có sắp xếp theo điểm số.
  - Hash: Bảng băm với các cặp key-value.
  - Bitmap: Chuỗi bit để theo dõi trạng thái.
  - HyperLogLog: Cấu trúc để ước lượng số lượng phần tử duy nhất.
  - Geospatial: Lưu trữ và truy vấn dữ liệu địa lý.
  - Streams: Lưu trữ luồng sự kiện theo thời gian.

- Kiến trúc của Redis được thiết kế để trở thành một hệ thống lưu trữ dữ liệu in-memory (trong bộ nhớ), mang lại tốc độ truy cập dữ liệu nhanh chóng.
- Redis sử dụng mô hình kiến trúc client-server với khả năng xử lý hàng loạt lệnh từ client và lưu trữ dữ liệu dưới dạng key-value.
- In-Memory Data Store: Lưu trữ dữ liệu trong RAM để truy cập nhanh.
- Client-Server Model: Client gửi lệnh tới Redis server và nhận kết quả.
- Persistence: Lưu trữ dữ liệu trên đĩa qua RDB hoặc AOF để đảm bảo an toàn dữ liệu.
- Replication: Hỗ trợ mô hình master-slave để phân tán và sao lưu dữ liệu.
- Sharding: Phân chia dữ liệu giữa các node để mở rộng quy mô.
- Sentinel: Giám sát và tự động failover giữa các Redis instances.
  Cluster: Giải pháp phân mảnh dữ liệu và tự động quản lý Redis trên nhiều node.

1. Callback
   Định nghĩa: Callback là một hàm được truyền như một đối số vào một hàm khác và sẽ được thực thi sau khi một số công việc (thường là bất đồng bộ) hoàn thành.
   Cách hoạt động: Khi hàm được gọi, callback không chạy ngay lập tức mà sẽ được thêm vào hàng đợi hoặc được gọi khi công việc hoàn thành.

2. Callback Queue

- Định nghĩa: Callback queue (hàng đợi callback) là một cấu trúc dữ liệu trong JavaScript mà chứa các hàm callback được lên lịch để thực thi sau khi stack (ngăn xếp) hiện tại rỗng.
- Điều này giúp đảm bảo rằng các hàm callback chỉ được gọi khi không có công việc nào khác đang được thực hiện.
- Cách hoạt động:
- Khi một hàm callback được lên lịch (thường thông qua các hàm như setTimeout, Promise, hoặc sự kiện), nó sẽ được thêm vào callback queue.
- Vòng lặp sự kiện (event loop) sẽ kiểm tra stack và nếu stack rỗng, nó sẽ lấy callback từ callback queue và thực thi nó.

- Callback: Là hàm được truyền vào một hàm khác để thực thi sau khi một công việc hoàn thành.
- Callback Queue: Là nơi lưu trữ các callback đã được lên lịch để thực thi sau khi ngăn xếp hiện tại rỗng. Vòng lặp sự kiện sẽ xử lý các callback trong hàng đợi này.

- Node.js chủ yếu là đơn luồng và tối ưu cho các tác vụ IO không đồng bộ, sử dụng work Threads

---

flow gitlab cicd

stages:

- pull
- install
- build
- deploy

-- bai toan nhieu connect dat don: message broker
-> toi da 100 thi 101 khong hop le

```

```
