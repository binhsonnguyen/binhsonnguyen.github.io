---
layout:    post
title:     'HTTPS hay là chuyện se-kju-rịt-chim'
date:      2018-04-24
---


> *Dịch với đôi chút phóng tác trên tinh thần hoàn toàn tôn trọng sự hài hước từ bài viết
[HTTPS explained with carrier pigeons][source] của Andrea Zanin - một sinh viên đang tự
học lập trình.*

Có thể nói mã hoá là một chủ đề khá khó hiểu bởi hàm lượng toán học quá cao. Nhưng trừ khi
bạn thật sự phát triển một hệ thống mã hoá, phần lớn những điểm phức tạp trong đó hầu như
không cần thiết cho việc hiểu những gì xảy ra ở lớp phía trên.

Nếu bạn mở bài viết này với hi vọng tạo ra được giao thức HTTPS thế hệ mới, tôi thành thật
xin lỗi vì mấy chú chim bồ câu không kham nổi. Còn lại, bạn có thể đi pha cà phê và thưởng
thức bài viết này.

## Hương, Dũng và những chú bồ câu?

Mọi hoạt động bạn làm trên Internet (đọc bài viết này, mua sách trên Tiki, share ảnh moè
lên facebook) đi theo việc gửi và nhận những thông điệp tới và từ một máy chủ nào đó.

Trò đó có khả năng hơi trừu tượng với bạn một chút, nên chúng ta cùng tưởng tượng rằng
những thông điệp đó được giao nhận bởi những chú bồ câu đưa thư, mà người dịch xin phép
được gọi ngắn gọn là **chim**. Tôi biết liên tưởng này là độc đoán, nhưng tin tôi đi, HTTPS
hoạt động theo lối hoàn toàn tương tự, mỗi tội nhanh hơn nhiều mà thôi.

Bên cạnh đó, thay vì nói về những máy chủ, khách và những tay hacker, chúng ta nói về
Hương, Dũng và Luân còi, mà trong bản gốc tiếng Anh là những cái tên Alice, Bob và Mallory
được dùng rất phổ biến trong những tài liệu viết về chủ đề này, ở đây người dịch xin phép
được Việt hoá để bạn dễ tưởng tượng hơn nữa.

## Sự thơ ngây buổi đầu

Nếu Hương muốn gửi thông điệp gì cho Dũng, cổ cột thư vào cổ chim và gửi nó cho Dũng. Dũng
nhận thư, mở ra và đọc và mọi chuyện đều ổn.

Nưng chuyện gì xảy ra nếu Luân còi bắt chim của Hương lại trong lúc nó bay, và đánh tráo
hay sửa gì đó trên bức thư? Không cách nào Dũng biết được điều đó.

Đó là cách mà **HTTP** làm việc. Nghe đáng sợ đúng không? Tôi sẽ không gửi những thông tin tài
khoản ngân hàng của tôi qua HTTP đâu và bạn cũng thế thôi.

## Cái mã bí mật

Giờ thì Hương và Dũng đã cáo già hơn nhiều. Họ đồng thuận rằng sẽ viết những bức thư theo
một mã pháp đặc biệt. Họ dịch tất cả các ký tự đi 3 vị trí theo thứ tự bảng chữ cái. Thông
điệp đơn giản _"dau cung duoc"_ sẽ trở thành _"bys asle bsma"_.

Bây giờ kể cả Luân còi có chơi trò chặn chim thì hắn cũng không thể nào hiểu được hay sửa
bức thư thành một thứ gì đó có ý nghĩa, bởi vì có biết cách giải mã đâu. Nhưng Dũng thì có
thể đơn giản áp dụng mã pháp để giải mã thư của Hương. Thông điệp mã hoá "bys asle bsma"
sẽ dễ dàng dịch ngược lại thành "dau cung duoc".

Ăn!

Trò này được gọi là **mã pháp sử dụng chìa đối xứng**, chìa trong mã pháp này đối xứng bởi
vì nếu bạn biết cách mã hoá một thông điệp bạn cũng sẽ biết cách làm sao để giải mã nó.

Mã pháp mà tôi vừa nêu ở trên thường được biết tới dưới tên gọi **mã pháp Ceasar**. Trong
thực tế, chúng ta sử dụng những mã pháp sành điệu và phức tạp hơn nhiều, nhưng ý tưởng
chính vẫn thế.

## Đặt chìa như thế nào cho hợp lý?

Mã pháp sử dụng chìa đối xứng rất bảo mật trong trường hợp không ai khác ngoài người gửi
và người nhận biết chìa nào đã được sử dụng. Trong mã pháp Ceasar, chìa chính là **số vị trí
mà các ký tự được xê dịch**. Hương và Dũng đã dùng 3, nhưng nó hoàn toàn có thể là 4 hay 12.

Vấn đề là Hương và Dũng chưa bao giờ gặp nhau trước khi bắt đầu trao đổi với nhau bằng
chim, họ không có cách nào để đồng thuận chiếc chìa khoá một cách bảo mật. Nếu họ gửi chìa
cho nhau bằng thư, khả năng cao là Luân còi sẽ chặn và khám phá được chìa khoá, và nhờ đó
có khả năng đọc và sửa thông điệp trước cả khi cặp đôi của chúng ta bắt đầu tỉ tê.

Đây là một ví dụ điển hình của loại hình tấn công **kẻ đứng giữa**, và cách duy nhất để
phòng chống nó là thay đổi toàn bộ hệ thống mã hoá cùng một lúc.

## Chim mang bao

Vậy là Hương và Dũng bắt đầu với một hệ thống còn tinh vi hơn. Khi Dũng đánh tiếng muốn
trao đổi với Hương, Hương sẽ làm những bước sau theo trình tự:

* Dũng gửi tới Hương một chim "trắng", không mang theo gì cả.
* Hương gửi ngược lại Dũng một chiếc hộp mở sẵn, nhưng giữ lại chìa khoá.
* Dũng nhận hộp, bỏ thư vào hộp, đóng lại, và gửi hộp cùng bức thư trong đó tới Hương.
* Hương nhận hộp, mở ra bằng chìa khoá của mình và đọc thư.

Chuyện tương tự cũng sẽ diễn ra khi Hượng muốn nhắn tới Dũng. Và với cách này thì việc
canh me của Luân còi sẽ thành vô nghĩa, bởi vì Luân không có chìa.

Cách này thật ra được biết tới rộng rãi dưới tên **mã hoá với chìa bất đối xứng**. Nó
không đối xứng về chìa, bởi vì kể cả khi bạn có thể mã hoá thông điệp (đóng hộp lại), bạn
không thể dùng cách ngược lại để giải mã (mở hộp đã đóng ra).

Dân chuyên nghiệp gọi hộp là chìa công khai và chìa dùng để mở hộp là chìa riêng tư.

## Có thể tin được cái hộp không?

Nếu để ý bạn có thể nhận ra rằng ở đây chúng ta vẫn còn một vấn đề. Khi Dũng nhận chiếc
hộp mở sẵn, làm nào Dũng make sure được rằng nó tới từ Hương chứ không phải từ Luân còi,
thứ mà Luân còi đã có sẵn khoá để mở?

Hương quyết định rằng sẽ ký lên hộp, bằng cách này khi Dũng nhận hộp Dũng có thể kiểm tra
chữ ký và nhờ đó biết được rằng chính Hương là người gửi chiếc hộp này.

Một vài bạn có thể nghĩ đến, làm thế nào Dũng nhận biết được chữ ký của Hương trông ra làm
sao ngay từ lần nhận hàng đầu tiên? Một câu hỏi hay! Cả Hương và Dũng đều gặp phải vấn đề
đó, thế nên họ đi đến quyết định rằng thay vì tự làm, họ nhờ Mr. Đới ký lên hộp.

Mà Mr. Đới là ai? Một người nổi tiếng, ai cũng biết, và rất được tin tưởng. Tất cả mọi
người đều biết chữ ký của ông ấy và đặt niềm tin rằng ông âý chỉ ký cho những người hợp
danh.

Trong trường hợp của chúng ta, Mr. Đới chỉ ký nếu ông ấy chắc chắn được rằng người đang
nhờ vả chính là Hương. Thế là Luân còi chịu không còn tráo được chiếc hộp của Hương nữa
bởi vì Mr. Đới chỉ ký sau khi xác nhận được danh tính của người gửi.

Mr. Đới, mà trong bài gốc, Ted, là một thuật ngữ kỹ thuật được biết tới rộng rãi dưới cái
tên **CA** - _nhà chứng nhận_, và trình duyệt mà bạn đang dùng được đóng gói kèm với chữ ký của
nhiều CA khác nhau.

Vậy nên khi bạn lần đầu kết nối với một website, chúng ta tin tưởng chiếc hộp của nó bởi
vì chúng ta tin Mr. Đới và ông ấy đã bảo với chúng ta rằng chiếc hộp đó là chính chủ.

## Hộp là thứ khá nặng

Giờ thì Hương và Dũng đã có một hệ thống đáng tin cậy để trao đổi, nhưng họ cũng nhận ra
rằng cho chim mang hộp thì chậm hơn đáng kể so với mang mỗi thư.

Vậy là họ quyết định rằng sẽ sử dụng hộp chỉ để chọn ra chìa để giải mã mật thư mà thôi
(bạn còn nhớ mã pháp Caesar chứ?).

Cách này hội đủ những gì tốt nhất của cả hai con đường. Sự đáng tin cậy của mã pháp bất
đối xứng và sự hiệu quả của mã pháp đối xứng.

Dù cho thế giới thật không dùng chim đi chăng nữa, mã hoá thông điệp bằng mã pháp bất đối
xứng vẫn chậm hơn so với đối xứng, cho nên chúng ta chỉ dùng nó để trao đổi chìa giải mã.

Giờ thì bạn đã biết làm thế nào mà **HTTPS** hoạt động, và cà phê của bạn cũng đã chín. Bạn
xứng đáng tế nên hãy đi thưởng thức thôi ;)

[source]: https://medium.freecodecamp.org/https-explained-with-carrier-pigeons-7029d2193351