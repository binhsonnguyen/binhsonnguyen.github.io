---
layout:     post
title:      'Ngôn ngữ viết tài liệu web: sự dịch chuyển từ markup-languages sang structuring-languages'
date:       2018-03-18
---

HTML: Hyper-text Markup Language (ngôn ngữ đánh dấu siêu văn bản) được định chuẩn với mục
đích **đánh dấu** trên tài liệu web. Việc đánh dấu này nhằm hai mục đính chính.

Thứ nhất, chia tài liệu thành nhiều cấu trúc nhỏ, để **tạo cấu trúc** cho tài liệu:

```html
<body>
<div class="header">

</div>

<div class="content-wraper">
  <div class="content-title">
    
  </div>
  <div class="content-body">
    
  </div>
</div>

<div class="footer">

</div>
</body>
```

Thứ hai, **trang điểm, định kiểu** cho các cấu trúc, để các cấu trúc đơn lẻ được hiển thị ra đúng 
theo mong muốn, tại đúng vị trí của nó:

```html
<div class="content-title" style="padding: 10px 5px 15px 8px">
  <p style="font-size: 1.6em"><b>Ngôn ngữ viết tài liệu web</b></p>
</div>
```

Với sự dịch chuyển tiên đề về "mã tốt" của những năm gần đây (dịch chuyển từ ưu tiên hiệu
năng cao sang ưu tiên dễ đọc và dễ cộng tác), các nhà phát triển sử dụng ngôn ngữ HTML 
đang ngày càng ưu tiên việc **tách riêng nhiệm vụ "trang điểm" ra khỏi tài liệu HTML**, 
biến tài liệu HTML thành một tài liệu càng ngày càng gần với khái niệm "thuần cấu trúc".

Các best-practice hiện tại luôn khuyến khích nhà phát triển đặt mã trang điểm vào tài liệu
định kiểu (CSS, Sass, Less, Scss,...). Các ngôn ngữ đặc thù cho việc định kiểu ngày càng
được phát triển nhiều hơn và hoàn thiện hơn. Cá biệt, một số template engine thế hệ mới
hoàn toàn hạn chế khả năng nhúng mã định kiểu vào mã mô tả cấu trúc, chẳng hạn như
[Pug][pug]:

```
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5)
  body
    h1 Pug - node template engine
    #container.col
      if youAreUsingPug
        p You are amazing
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

Đoạn mã trên có thể làm nhiều nhà phát triển đọc không quen "hốt hoảng", nhưng tôi tin 
chắc rằng thời gian để đọc hiểu nó vẫn nhanh hơn khá nhiều so với thời gian mà "ngày xưa"
họ phải bỏ ra để sắp xếp được kiến thức của họ về HTML.

Cá nhân tôi tin rằng theo sau những ngôn ngữ định kiểu, sẽ tới những ngôn ngữ định cấu
được phát triển và chấp nhận nhiều hơn, chúng sẽ được thoát ra ngoài phạm vi của template
engine, sẽ được các trình duyệt mặc định hỗ trợ, sẽ được thay thế HTML để đưa vào các cuốn
sách "làm frontend trong 3 ngày".

[pug]: https://github.com/pugjs/pug