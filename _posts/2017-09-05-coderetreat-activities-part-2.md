---
layout:     post
title:      Những luật dở người của CodeRetreat - Part 2
date:       2017-09-05
---

Đây là một bài tôi viết cộng tác cho chiến dịch truyền thông của Autumn Code Retreat 2017. Chỉ có 
part 2, vì những phần còn lại do các giáo sư khác viết :-)

Chỉ dùng text-editor, chỉ dùng giấy?
---

Cũng như *không dùng chuột*, hai hoạt động trên là của một nhóm hoạt động mà trong đó nhà phát 
triển bị tước mất các công cụ làm việc quen thuộc, nói trắng ra, là những công cụ mà bình thường, 
nhà phát triển vẫn quen dựa dẫm vào. Chuột, IDE, rồi thì cả bàn phím (nhưng viết mã mà không có 
bàn phím thì thà dùng giấy còn hơn, thế nên chúng ta dùng giấy).

Cũng giống như câu chuyện lạc trên hoang đảo. Không còn điện thoại máy tính truyện tranh xe máy
và những stuffs khác, trước mặt bạn là bài toán sinh tồn, và bạn sẽ phải động não để tập dùng 
những thứ còn lại, thật quen, thật hữu dụng, để làm nên nhiều chuyện nhất, để sinh tồn. Mất chuột,
bạn sẽ phải học cách dùng bàn phím hữu dụng hơn, mất IDE, bạn sẽ học cách moi những tài liệu về 
API từ trong trí nhớ ra chính xác hơn, mất khả năng sửa xoá của máy tính, bạn sẽ học khả năng phác 
thảo thiết kế trước khi thực sự triển khai, v.v. Trên đây chỉ là một trong rất nhiều những KỸ-
NĂNG-CƠ-SỞ mà bạn đã bỏ quên, cho đến khi bạn **mất đi chỗ dựa**.

Thế nên hãy 

KEEP CAMP and "chỉ dùng thứ gì đó".

Không dữ liệu nguyên thuỷ
---

Lần này không phải là công cụ. Hãy tưởng tượng bạn biết một ngôn ngữ lập trình. Thế rồi đột nhiên 
ngôn ngữ đó mất hẳn đi một tính năng lớn, giống như bạn vừa vào buồng điện thoại yêu cầu của 
Doraemon và bảo "hãy làm cho Java không còn câu lệnh rẽ nhánh".

Có thể không phải là rẽ nhánh, có thể là vòng lặp, hay như ở đây là kiểu dữ liệu nguyên thuỷ, nhưng 
cho dù là trường hợp nào, thứ bị mất đi luôn luôn là một viên gạch thô rất cơ bản của ngôn ngữ lập 
trình.

Không còn những thứ thô sơ nữa, không còn cú pháp máy cứng nhắc nữa, không còn trẻ nít nữa, bạn 
phải học cách tập trung vào những tầng lớp trừu tượng cao hơn, những đối tượng "sống" hơn, những 
method gần với hành động của thực thể hơn.

Chẳng phải các bạn luôn muốn nắm được tư duy ở tầng lớp đó? Nếu không thì các bạn tải ebook
"Design Patterns" về làm gì?

Chỉ bốn dòng triển khai cho mỗi phương thức, please
---

Làm gì? @@?

Xin lỗi, tôi biết nó thổ tả, nhưng xin lỗi, không có cách nào khác, nó là ràng buộc chất lượng,
thưa bạn. Ai cũng muốn mã tốt, có điều ai cũng chịu không có cách nào nhanh để biết được mã của 
bạn có tốt không. Nhưng có một chắc chắn rằng hầu hết mã rất tốt đều có phương thức rất ngắn. Tức 
là, nếu mã có phương thức dài, thì gần như là nó không tốt.

Đừng viết mã không tốt.

Đừng viết phương thức dài.

Đừng để nó dài.

*PS:
À, nếu được, đừng để nó mutable.*
