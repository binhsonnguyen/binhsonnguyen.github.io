---
layout:     post
title:      Tái cấu trúc - Mã xấu
date:       2017-06-26
tags:       [refactoring smell development code]
comments:   true
---

TL'DR
-----

Để tăng tính hình tượng thì "mã xấu" thường gọi gọi là "code thối", "mùi", "khắm" :D các kiểu. Nhưng với tổng kết của tôi, đặc trưng của tất cả các thể loại mã có mùi đều có một đặc điểm là khó "đọc" - từ cái đọc đơn thuần nhất là đọc syntax, tới những cái đọc ở mức trừu tượng cao hơn như đọc object - module - pattern - business etc. Do đó tôi muốn dùng từ "mã xấu" từ đây về sau cho thể loại mã cần tái cấu trúc.

Đối với người đọc ở bất kỳ cấp độ nào, việc **cảm thấy đọc trúc trắc** luôn là dấu hiệu cho mã xấu, đại biểu cho việc có thể việc tái cấu trúc là cần thiết. Thông qua việc tái cấu trúc, chúng ta khử mã xấu, và làm cho việc phát triển trong tương lai có tốc độ **bằng hoặc nhanh hơn** hiện tại. Việc không thường xuyên loại bỏ mã xấu có thể khiến cho dự án bị **tê liệt hoàn toàn** tại một thời điểm nào đó, lãng phí một thời gian rất lớn để "lội" trong mã và có khi là thêm chừng ấy thời gian nữa để viết lại từ đầu.

**Tốt nhất là tái cấu trúc càng sớm càng tốt trước khi chỗ mã xấu có cơ hội phình to ra.**

Dưới đây tôi liệt kê những nhóm "mùi" lớn, việc sắp xếp các mùi vào từng nhóm tuy chỉ mang tính chất tương đối, nhưng nó thật sự giúp ích cho việc

Phình to
--------

Một trong những loại mùi thường gặp và dễ nhận ra nhất. Rất tiếc là tôi chưa thể tìm được một danh từ tương xứng trong tiếng Việt, với tiếng Anh thì những khối mã quá "phình" được gọi bằng *code bloats* hoặc *bloaters*. Chúng là những khối - phương thức - lớp mà đã trở nên lớn "phi thường" và cực kỳ khó thao tác. Thông thường chúng không "mọc" lên ngay lập tức mà thường tích luỹ dần qua thời gian, mỗi khi có ai đó "động" vào (đặc biệt là khi không có ai bỏ effort ra để khử chúng).

Lạm dụng hướng đối tượng
-------------------------

Bao gồm những mùi liên quan đến việc áp dụng những nguyên tắc hướng đối tượng một cách không hoàn chỉnh thậm chí hoàn toàn "tuột chạc".

"Bóp" sự thay đổi
-----------------

Thử tưởng tượng khi bạn muốn thay đổi một ít ở đâu đó trong code, nó kéo theo một số lượng khổng lồ thay đổi ở những nơi khác, biến việc bạn muốn làm trở quên phức tạp và có chi phí quá cao. Mặc dù những "mùi" cũng có đặc tính này. Nhưng có một vài loại mùi thật sự "bóp" rất chặt :).

Vô dụng
-------

Là những chỗ code vô nghĩa, không nên tồn tại và thậm chí không có chúng làm cho code sạch sẽ, lịch sự, hiệu quả và dễ hiểu hơn

Móc nối
-------

Mặc dù bản thân việc vi phạm OOP cũng gây ra tình huống này. Nhưng có những loại thể hiện việc các class liên kết/phụ thuộc vào nhau chặt chẽ vượt quá mức bình thường. Chúng được xếp riêng vào nhóm này.
