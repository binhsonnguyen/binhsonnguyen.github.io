---
layout:     post
title:      Chuẩn bị tới Code Retreat - hiểu Simple Design thế nào cho đúng?
date:       2017-09-05
---

Nội dung bài viết này được thực hiện với mục đích truyền thông cho sự kiện [Autumn Code Retreat 2017]
[autumn-code-retreat].

Quên "thiết kế" đi
---

Bất cứ ông thần nào quan tâm tới nghề này một tí, đều sẽ được dạy từ nguồn nào đó, rằng *"hãy thiết
kế dễ thay đổi, thay đổi rất tốn chi phí, hãy làm nó rẻ hơn, hãy chuẩn bị cho sự mở rộng"*. Nhưng 
Kent Beck - kẻ-mà-ai-cũng-biết-là-ai thì đã tỉnh táo nhận ra, trong thực tế, rằng:

*"Càng làm ra nhiều sự chuẩn bị, mã của tôi càng khó thay đổi. "*

*Những chuẩn bị của tôi xung đột với những thay đổi mà cuối cùng tôi tạo ra. Và tôi đành phải chọn
dùng mớ rác đã bày sẵn ấy hay là quẳng chúng đi, mà dù cho đằng nào thì nó vẫn ảnh hưởng đến 
việc tôi đang muốn làm.*

Nếu định nghĩa *"thiết kế"* trong ngoặc kép của bạn là để chuẩn bị một mớ khả năng mở rộng trong 
tương lai, vậy hãy đơn giản quên nó đi.


"Thiết kế tốt"
---

Bất cứ ông thần nào quan tâm tới nghề này cũng thích thảo luận về *"thiết kế như nào là tốt"*.
Nhưng nó chẳng thể đi đến một câu trả lời tối thượng nào cả. Nếu bạn hỏi những nhà phát triển khác 
nhau cùng câu hỏi đó, bạn sẽ nhận được rất nhiều câu trả lời khác nhau. Điều đó tạo nên giá trị 
 cho cuộc thảo luận. So sánh giữa những câu trả lời này đôi khi có thể mang 
lại cái nhìn sâu sắc về các kỹ thuật để cải thiện mã, đặc biệt là khi xoay quanh một 
đoạn mã cụ thể. Tuy nhiên, với mục đích trả lời cho vấn đề chính, *"như thế nào mới là tốt"*, chúng 
chẳng đi đến đâu.

Thay vào đó, tôi đề nghị nên thảo luận về *"thiết kế tốt hơn"*. Nó đưa chúng ta tới những thảo luận 
cụ thể hơn, đưa đến nhiều chứ không chỉ một thiết kế chạy ngon , và tránh cho chúng ta những 
tranh cãi đi vào ngõ cụt. Nếu chúng ta có được nhiều tiến hoá của thiết kế để so sánh, chúng ta có thể tìm 
thấy một vài manh mối căn bản của sự *"tốt hơn"*. Nắm giữ được những căn bản đó, Kent Beck nói, *"là
chúng ta thực sự biết làm phần mềm"*.

Có một điều bất biến mà gần như bất cứ, vâng, ông thần nào trong nghành này cũng phải công nhận, đó là 
*mọi thứ rồi sẽ thay đổi*. Bất kể đó là một project cá nhân chuồn chuồn muỗi, hay là một hệ thống 
khổng lồ phục vụ một tập đoàn đa quốc gia, thì những chức năng mong muốn sẽ thay đổi sau một thời
gian nào đó, đòi hỏi phải sửa lại mã. Và nếu ta không chú ý, mã của chúng ta sẽ hỏng, bó cứng lại 
thành một khối không thể sửa tiếp được nữa, thách thức chúng ta tiếp tục thay đổi trong tương lai.

Thiết kế đơn giản, là đặc tính của những thiết kế dễ dàng thay đổi. Cố gắng tạo nên một thiết kế 
đơn giản là chìa khoá cho *"thiết kế tốt hơn"*. Bất cứ khi nào chúng ta cần phải lựa chọn, hãy chọn
làm cho mã dễ thay đổi hơn, nói cách khác, chọn để cho thiết kế đơn giản hơn.

Một ví dụ cụ thể, đó là làm ra những file cấu hình hầm hố cho toàn bộ hệ thống, ngay từ đầu. Làm như thế,
chúng ta đang đi ngược lại nguyên tắc thiết kế đơn giản. Chúng ta không thể nào biết chính xác những gì sẽ thay 
đổi. Mỗi một cấu hình được soạn sẵn là một niềm tin về sự tiến triển của hệ thống,
một phát ngôn chắc như đinh đóng cột, rằng *"chắc chắn nó sẽ như thế trong tương lại, cho nên làm 
ngay từ bây giờ là có giá trị hơn"*. Nhưng bạn biết Kent Beck đã nói gì ở trên rồi đấy?

*"Đừng viết mã đoán trước tương lai, xếp đặt mã để nó thích ứng được tương lai, khi tương lai đến"* 

-- **Sandi Metz**, lập trình viên, nhà phát triển, tác giả *"Practical Object-Oriented Design in Ruby"* 
và *"99 Bottles of OOP"*

Nguyên tắc
---

Kent Beck đã soạn ra một bộ những nguyên tắc thiết kế đơn giản cũng rất... đơn giản, cụ thể, và 
đẹp đến nỗi Martin Fowler đã gọi "đểu" thành [*"Bộ nguyên tắc thiết kế Beck"*][beck-rules]:

- Các kiểm thử xanh hết
- Rõ ý
- Không lặp
- Nhỏ hết mức có thể

Các kiểm thử xanh hết 
---

Nguyên tắc này đứng đầu tiên là một điều rất đáng suy nghĩ. Sau tất cả, nếu chương trình chạy không
giống như mong muốn, thì mọi thiết kế, kể cả thiết kế đơn giản, cũng sẽ không có ý nghĩa gì, đúng 
không?

Rõ ý
---

"Rõ ý" là cách nói của Kent Beck về mã dễ đọc, nếu bạn đã từng tham khảo cuốn "Clean Code". Giao 
tiếp, là một trong những giá trị cốt lõi của XP, và nhiều lập trình viên muốn nhấn mạnh rằng "mã 
là để NGƯỜI đọc" (không phải chỉ để cho máy tính chạy). Cách bác Kent dùng từ ngụ ý rằng chìa khoá 
để dễ đọc là nói rõ ý định của bạn ở trong mã, để độc giả không tốn thời gian "dịch" những gì 
bạn viết ra. Mã đọc không nổi, thì đừng nói đến chuyện viết thêm cái thay đổi gì.

Không lặp
---

Kiểm thử xanh hết là quy tắc cụ thể nhất, Rõ ý, là quy tắc trừu tượng nhất. Nhưng không lặp lại 
có lẽ là quy tắc tinh tế và mạnh mẽ nhất trong 4 quy tắc này. Đối với bác Kent thì không lặp được nói dài là "Chỉ 
một lần duy nhất". Nhiều lập trình viên đã quan sát thấy rằng việc cố gắng thực hiện loại bỏ 
sự trùng lặp đã thật sự dẫn dắt ra những thiết kế tốt hơn.

Nhỏ hết mức có thể
---

Tôi gọi là "chật" - ngụ ý rất ngắn gọn rằng *bất cứ thứ gì không phục vụ ba nguyên tắc trên" đều phải được loại 
bỏ. Nếu vẫn còn thứ gì đó có thể bỏ đi được, mà vẫn giữ được 3 nguyên tắc trên, 
thì có nghĩa là thiết kế vẫn còn có thể làm cho đơn giản hơn, đúng không?



[autumn-code-retreat]: http://codegym.vn/blog/autumn-coderetreat-2017/
[beck-rules]:https://martinfowler.com/bliki/BeckDesignRules.html#footnote-xp-formulation
