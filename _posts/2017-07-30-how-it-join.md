---
layout:     post
title:      Nó đã JOIN như thế nào?
date:       2017-07-30
---

Tôi vừa tìm ra một cách truyền đạt đơn giản để giải thích về các thể loại `JOIN` của `SQL`. Sau đây là phần trình bày.

Lưu ý: có thể nó không diễn đạt đúng (hay có khi đúng thật cũng nên) việc SQL đã join như thế nào. Nhưng nếu bạn tư duy về join như dưới đây thì bạn sẽ dễ giải thích và tiên liệu nó hơn, trong khi vẫn có được kết quả đúng.

TL;DR
-

Câu lệnh JOIN hoạt động dựa trên một tập các **điều kiện liên kết**, hay **điều kiện join** các cột của bảng (hoặc nhiều bảng) với nhau. Kết quả của điều kiện ấy là `Boolean`. Một số ví dụ về điều kiện như là

~~~sql
ON TRUE
ON FALSE
ON table_a.c1 = table_a.c2
ON table_a.c1 = table_b.c2
ON table_a.c1 = table_b.c2 AND table_a.c3 <> table_b.c4
~~~

JOIN THM ALL
-

Để hiểu việc sql dựa vào điều kiện join để cho ra kết quả như thế nào, chúng ta sẽ quan sát tình huống sau đây. Ta có `table_a` và `table_b`. Điều kiện join sử dụng liên kết giữa cột table_a.c3 và table_b.c2.

<img src="/resource/posts/2017-07-30-how-it-join/01.jpg" width="444px" height="114px" align="center" >

Ta đẩy hai cột trong điều kiện join về hai phía như thế này để dễ hình dung hơn các bước sau:

<img src="/resource/posts/2017-07-30-how-it-join/02.jpg" width="444px" height="114px" align="center" >

SQL sẽ dính hai bảng lại với nhau để tạo thành bảng kết quả, những cặp row nào thoả mãn điều kiện join thì sẽ đi chung với nhau, không thì thôi kệ

<img src="/resource/posts/2017-07-30-how-it-join/03.jpg" width="444px" height="115px" align="center" >

...và thành thế này:

<img src="/resource/posts/2017-07-30-how-it-join/04.jpg" width="389px" height="163px" align="center" >

Giờ thì rất dễ để tưởng tượng, nếu phép `JOIN` là mặc định, tức là tương đương `INNER JOIN`, thì chỉ những row thoả điều kiện được đánh dấu được đưa vào bảng kết quả:

<img src="/resource/posts/2017-07-30-how-it-join/05.jpg" width="389px" height="97px" align="center" >

Nếu là `LEFT JOIN`, thì những row nào còn lại của bảng bên trái, cũng sẽ được đưa vào bảng kết quả, đương nhiên những row đó không mang theo được tí dữ liệu nào của bảng bên phải.

<img src="/resource/posts/2017-07-30-how-it-join/06.jpg" width="389px" height="147px" align="center" >

Chuyện tương tự cũng xảy ra với `RIGHT JOIN`.

Bạn thử tự tưởng tượng xem `OUTER JOIN`, và `FULL OUTER JOIN` thì sẽ thế nào nhé.

TL;DR
-

Tất cả các tên của phép join: `INNER`, `OUTER`, `FULL OUTER`, `LEFT`, `RIGHT` đều đến từ biểu đồ hai hình tròn chập vào nhau. Các bạn có thể thử từ khoá `sql joins` bằng [google images][google-images] để tìm các bài viết liên quan và đối chiếu.

[google-images]: https://www.google.com/search?site=imghp&tbm=isch&q=sql+joins&oq=sql+joins


