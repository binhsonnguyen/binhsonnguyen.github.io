---
layout:     post
title:      (Đề xuất thuật ngữ) TDD hay EDD
date:       2017-11-02
---

Trong những năm vừa qua, khi cơn bão Lean, XP, Scrum, Kaizen nhập vào cùng cơn bão Agile đổ tới, 
phường lập trình Việt Nam (nếu nó đã đủ gắn kết đến mức thành một phường) cũng đón nhận một khái
niệm, một tư duy làm sản phẩm mới: Test-Driven-Development.

Khái niệm đó là tương lai cần phổ cập, chuyện này thì không nói nhiều người cũng thấy, tôi cũng 
không có ý định làm rõ điều đó trong bài viết này. Trong bài này tôi chỉ nói về phương hướng dịch
thuật.

Tại sao chuyện dịch thuật lại quan trọng? Đâu đó tôi nghe được rằng ngôn ngữ là vỏ bọc của tư duy.
Tôi tạm thời công nhận điều đó và lấy sử dụng chính xác thuật ngữ làm ràng buộc cho tư duy của mình.

Quay trở lại Test-Driven-Development - từ giờ sẽ viết tắt thành TDD, tôi có kinh nghiệm chia sẻ và 
hướng dẫn các bạn trong nghề về khái niệm, kỹ thuật và tư duy này. Nhưng tôi nhận ra rằng đa số các 
bạn không có được cái hiểu rõ ràng về thuật ngữ ngay từ lần giải thích đầu tiên.

Chúng tôi đã chia sẻ về TDD bằng việc sử dụng cả thuật ngữ tiếng Anh lẫn chuyển ngữ "Phát triển 
hướng Kiểm thử".

Tôi nhận ra rằng sự khó chiếm lĩnh nằm ở khái niệm Kiểm thử.

Dịch như thế không có gì sai. Bao lâu nay nghề tester đã được dịch thành "làm kiểm thử". Quá hay.

Nhưng dùng "kiểm thử" để giải thích về TDD thì lại có vấn đề.

Sau khi khởi sinh, và qua thời gian thử nghiệm trên diện rộng cũng như làm đầy đặn khái niệm, TDD
được hiểu là sử dụng việc mở rộng các kiểm thử đơn vị, song song với làm cho sản phẩm đạt tới tình 
trạng hợp lý nhất mà đáp ứng được bộ kiểm thử mới được tăng trưởng, và chỉ thế mà thôi.

Như vậy là kiểm thử sinh trước, sản phẩm có sau. Như thế không phải là "kiểm" nữa mà là tập trung
vào "thử", vào "thí". Vì "kiểm" thì là kiểm tra trên cái đã có sẵn, nhưng trong thực hành TDD thì 
đôi khi ta "kiểm" trên cái chưa từng có bao giờ. "Thử nghiệm", hay "thí nghiệm", thì không gặp 
phải mâu thuẫn này.

Hay hơn nữa, hãy làm rõ khái niệm "unit test" - vẫn được dịch thành "kiểm thử đơn vị". Hoàn toàn 
gặp phải mâu thuẫn tương tự như trên. Và nếu thay bằng "thử nghiệm đơn vị" thì vẫn hoàn toàn 
miêu tả được "unit test".

Đến đây tôi cho rằng nếu nói chuyện về TDD, ta hoàn toàn có thể dùng khái niệm việt hóa là "Phát
triển hướng thử nghiệm", và nói về Unit Test thì có thể sử dụng "thử nghiệm đơn vị". Tôi cho rằng
sẽ dễ dàng tiếp cận (chiếm lĩnh) hơn so với sử dụng "kiểm thử".

Khó khăn gặp phải còn lại, đó là chữ T trong TDD là "test", chứ không phải "eperiment".

Sao người Mĩ chưa sửa TDD thành EDD đi nhỉ.
