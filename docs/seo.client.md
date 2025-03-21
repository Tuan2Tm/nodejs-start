### Thêm thẻ canonical để giúp Google biết trang chính xác cần index, tránh tình trạng duplicate content.

`<link rel="canonical" href="https://yourwebsite.com/current-page-url" />`

### Cung cấp sitemap.xml giúp công cụ tìm kiếm hiểu được cấu trúc trang web của bạn và lập chỉ mục một cách hiệu quả.

```javascript
next-sitemap.config.js
module.exports = {
siteUrl: 'https://yourwebsite.com',
generateRobotsTxt: true,
};

package.json
"scripts": {
"postbuild": "next-sitemap"
}
```

### Thêm file robots.txt để quản lý việc các bot tìm kiếm có thể truy cập hoặc lập chỉ mục các phần nào của website.

> User-agent: \*
> Disallow: /admin/
> Allow: /
> Sitemap: https://yourwebsite.com/sitemap.xml

### AMP giúp các trang tải nhanh hơn trên thiết bị di động, giúp cải thiện thứ hạng SEO

`export const config = { amp: true };`

### Tối ưu hóa nội dung cho từ khóa

- Việc tối ưu nội dung với từ khóa liên quan cũng rất quan trọng. Đảm bảo rằng từ khóa của bạn xuất hiện trong:
  - Thẻ title
  - Thẻ meta description
  - URL slug (đường dẫn URL)
  - Heading tags (H1, H2,...)
  - Alt text của hình ảnh

### Breadcrumbs và Structured Data

```javascript
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://yourwebsite.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://yourwebsite.com/products"
      }
    ]
  }
</script>
```
