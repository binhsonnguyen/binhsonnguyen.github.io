---
layout: post
title:  "Tái cấu trúc"
date:   2017-06-23
tags: [refactoring development code]
---

TL'DR
-----

Trong thời gian sinh hoạt tại clb Codegym do [học viện Agile][hv-agile] tổ chức, tôi nảy ra ý định viết sery này - một phần là do cũng có ý tưởng từ rất lâu.

Why
---

Kim chỉ nam cho hoạt động *tái cấu trúc* nằm ở câu chuyện *Clean Code*, cũng có thể nói là *Clean Code* của *Robert C. Martin*. Tôi rất tiếc không thể đá sang vấn đề đó ở đây, nhưng tôi cam đoan rằng *Clean Code* của *Robert C. Martin* sẽ cho bạn nền tảng nhận thức vững chắc hơn không những trong vấn đề *tái cấu trúc* mà còn nhiều mảng khác của câu chuyện phát triển.

Tuy nhiên tôi vẫn có thể tóm gọn lại, mục đích của *tái cấu trúc* là để làm mã **dễ đọc hơn**. Các bạn sẽ nhận thấy điều đó xuyên suốt loạt bài này, dù chỉ một bước tái cấu trúc nhỏ nhất cũng có thể làm bạn nhận ra mã trông *lịch sự* hơn thấy rõ. Thông qua đó, mã ngày càng dễ đọc hơn, ngày càng có tính mô tả bussiness hơn, nói trắng ra là càng trông giống văn bản hơn (một trong những mô tả đanh thép về *mã sạch* được nhắc đến trong **Clean Code**).

How
---

`<Đập bàn/>` - chính xác, đấy là nội dung của loạt bài này. Thật ra cũng chỉ là nội dung trong [khoá học của master Yoda][yoda-course], bị tôi thó ra, biên soạn lại, thêm các giải thích và diễn giải cá nhân mà thôi. Không phải là sáng tác gì hết. Các bạn không chờ được tôi thì có thể vào đấy mua phứt cho rồi, hoặc bao giờ cảm thấy loạt bài của tôi tạo ra giá trị cho bạn, nhớ vào đấy mua course trả nợ nhé.

Loạt bài này sẽ giúp bạn hệ thống hoá hiểu biết của bạn về chuyện mã sạch và mã xấu. Chúng ta trước tiên sẽ học cách nhận ra mã có mùi - là những điển hình của thể loại mã mà bạn *nhất thiết* không nên viết ra. Song song với đó chúng ta sẽ duyệt qua một số lượng lớn các **phương thức tái cấu trúc** và phân tích xem làm thể nào để khử mùi.

Chúc các bạn đọc vui, may the force be with you!

[yoda-course]: https://refactoring.guru
[blog-source]: https://github.com/binhsonnguyen/binhsonnguyen.github.io
[hv-agile]: http://hocvienagile.com
