## Để cấu hình Nginx và SSL cho domain của bạn và trỏ ứng dụng từ cổng 3000 tới http và https, bạn cần làm theo các bước sau:

### Bước 1: Cài đặt Nginx

Trước tiên, bạn cần cài đặt Nginx (nếu bạn chưa cài). Sử dụng command sau để cài Nginx:

```javascript
sudo apt update
sudo apt install nginx
```

### Bước 2: Cấu hình Nginx

Sau đó, cấu hình Nginx để reverse proxy tới ứng dụng của bạn. Tạo một file cấu hình mới trong thư mục `/etc/nginx/sites-available/`:

`sudo nano /etc/nginx/sites-available/api-form`

Dán nội dung sau vào file cấu hình:

```javascript
server {
listen 80;
server_name api-form.phenikaa-x.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}
```

Lưu và đóng file bằng cách nhấn `Ctrl + X`, sau đó nhấn `Y` và `Enter`.

Tiếp theo, kích hoạt cấu hình bằng cách tạo một liên kết đến file cấu hình từ thư mục `/etc/nginx/sites-enabled/`:

`sudo ln -s /etc/nginx/sites-available/api-form /etc/nginx/sites-enabled/`

Cuối cùng, kiểm tra xem cấu hình Nginx có lỗi hay không và khởi động lại dịch vụ:

```javascript
sudo nginx -t
sudo systemctl restart nginx
```

### Bước 3: Cài đặt và Cấu hình Let's Encrypt

Sau cùng, bạn cần cài đặt và cấu hình SSL cho trang web của bạn sử dụng Let's Encrypt. Bạn có thể sử dụng Certbot, một công cụ giúp cài đặt và gia hạn chứng chỉ SSL một cách tự động.

`sudo apt install certbot python3-certbot-nginx`

Sau khi cài đặt thành công, bạn có thể tạo chứng chỉ SSL cho tên miền của mình:

`sudo certbot --nginx -d api-form.phenikaa-x.com`

Certbot sẽ hướng dẫn bạn qua quá trình cài đặt. Khi được hỏi, chọn để nó tự động cấu hình Nginx cho bạn để bật HTTPS.

Bây giờ, trình duyệt web sẽ hiển thị một khóa bên cạnh URL, xác nhận rằng trang web của bạn đang được bảo mật với SSL.

Nếu bạn muốn kiểm tra cấu hình SSL của bạn, bạn có thể sử dụng công cụ như [SSL Labs' SSL Server Test](https://www.ssllabs.com/ssltest/).

Lưu ý: Đảm bảo rằng cổng 80 và 443 trên máy chủ của bạn không bị chặn bởi bất kỳ tường lửa nào.
